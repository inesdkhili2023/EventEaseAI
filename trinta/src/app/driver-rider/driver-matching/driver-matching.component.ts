import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RiderRequest } from '../RiderRequest';
import { Driver } from '../Driver';
import { MatchResult } from '../MatchResult';
import { DriverMatchingService } from '../../services/driver-matching.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DriverTrackingService } from '../../services/driver-tracking.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

// Configuration des icônes Leaflet
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-driver-matching',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,MatTableModule,MatPaginatorModule,MatMenuModule,MatButtonModule],
  templateUrl: './driver-matching.component.html',
  styleUrls: ['./driver-matching.component.scss']
})
export class DriverMatchingComponent implements AfterViewInit, OnInit, OnDestroy {
  rider: RiderRequest = {
    id: '',
    latitude: 0,
    longitude: 0,
    passengerCount: 1,
    urgencyLevel: 'medium',
    maxWaitTime: 15
  };

  drivers: Driver[] = [];
  newDriver: Driver = {
    id: '',
    nom: '',
    prenom: '',
    vehicleType: 'Standard',
    capacity: 1,
    latitude: 0,
    longitude: 0,
    rating: 4.5,
    pricePerKm: 1.2,
    email :'',
    password: '',
    date_naissance:'',
    adresse:'',
    experienceYears: 2,
    responseTime: 5,
    available: true,
    num_tel: '',
    image_url: ''
  };
  
  matches: MatchResult[] = [];
  isLoading = false;
  selectedDriver: Driver | null = null;
  errorMessage = '';
  private driversLoaded = false;
  private mapReady = false;
  // --- Map control
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private mapInitialized = false;
displayedColumns: string[] = ['photo', 'nom', 'vehicleType', 'available', 'actions'];

  constructor(
    private matchingService: DriverMatchingService,
    private driverService: DriverTrackingService
  ) {}

  ngOnInit() {
    this.getUserLocation();
    this.loadDrivers();
  }
  
   ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

filterByAvailability(filter: 'all' | 'available' | 'unavailable') {
  if (filter === 'available') {
    this.drivers = this.drivers.filter(d => d.available);
  } else if (filter === 'unavailable') {
    this.drivers = this.drivers.filter(d => !d.available);
  } else {
    this.loadDrivers(); // recharge tous
  }
}
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

   private initMap(): void {
    if (this.mapInitialized) return;
    
    try {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Élément map non trouvé');
        return;
      }

      this.map = L.map('map').setView([36.8065, 10.1815], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.mapInitialized = true;
      this.mapReady = true;
      console.log('Carte initialisée avec succès');

      // Si les chauffeurs sont déjà chargés, mettre à jour les marqueurs
      if (this.driversLoaded && this.drivers.length > 0) {
        this.updateMarkers();
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  }

  private updateMarkers(): void {
    if (!this.map) {
      console.warn('Carte non initialisée - impossible de mettre à jour les marqueurs');
      return;
    }

    console.log('Mise à jour des marqueurs avec', this.drivers.length, 'chauffeurs');

    // Supprime les anciens marqueurs
    this.markers.forEach(m => this.map?.removeLayer(m));
    this.markers = [];

    // Ajoute les marqueurs chauffeurs
    this.drivers.forEach((d, index) => {
      // Vérification plus robuste des coordonnées
      if (d.latitude && d.longitude && 
          !isNaN(d.latitude) && !isNaN(d.longitude) &&
          d.latitude !== 0 && d.longitude !== 0) {
        
        //console.log(`Ajout marqueur ${index + 1}:`, d.nom, d.latitude, d.longitude);
        
        const marker = L.marker([d.latitude, d.longitude])
          .addTo(this.map!)
         
          .on('click', () => {
            this.selectedDriver = d;
          });
        
        this.markers.push(marker);
      } else {
        console.warn(`Chauffeur ${d.nom} ignoré - coordonnées invalides:`, d.latitude, d.longitude);
      }
    });

    // Ajoute la position du rider
    if (this.rider.latitude && this.rider.longitude && 
        this.rider.latitude !== 0 && this.rider.longitude !== 0) {
      
      const riderIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448440.png',
        iconSize: [32, 32],
      });
      
      L.marker([this.rider.latitude, this.rider.longitude], { icon: riderIcon })
        .addTo(this.map!)
        .bindPopup('<b>Vous êtes ici</b>')
        .openPopup();
    }

    // Ajuste la vue de la carte pour montrer tous les marqueurs
    if (this.markers.length > 0) {
      const group = new L.FeatureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
      console.log('Vue ajustée pour', this.markers.length, 'marqueurs');
    } else {
      console.warn('Aucun marqueur valide à afficher');
      // Centrer sur une position par défaut si aucun marqueur
      this.map.setView([36.8065, 10.1815], 13);
    }
  }

   getUserLocation(forDriver: boolean = false) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (forDriver) {
            this.newDriver.latitude = lat;
            this.newDriver.longitude = lng;
          } else {
            this.rider.latitude = lat;
            this.rider.longitude = lng;
            // Ne pas appeler loadNearbyDrivers() ici si vous voulez tous les chauffeurs
          }
          
          this.updateMarkers();
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          this.errorMessage = 'Impossible de récupérer votre position GPS.';
        }
      );
    } else {
      this.errorMessage = 'La géolocalisation n\'est pas supportée par votre navigateur.';
    }
  }

 loadDrivers(): void {
    this.driverService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.driversLoaded = true;
        console.log('Chauffeurs chargés:', this.drivers.length);
        
        // Si la carte est prête, mettre à jour les marqueurs
        if (this.mapReady) {
          this.updateMarkers();
        }
      },
      error: (err) => {
        console.error('Erreur chargement chauffeurs', err);
        this.errorMessage = 'Erreur lors du chargement des chauffeurs';
      }
    });
  }

  

  // ... le reste de vos méthodes reste inchangé
  loadNearbyDrivers() {
    this.isLoading = true;
    this.matchingService.getNearbyDrivers(
      this.rider.latitude, 
      this.rider.longitude
    ).subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.isLoading = false;
        this.updateMarkers();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des chauffeurs';
        this.isLoading = false;
      }
    });
  }

  findBestMatches() {
    if (!this.drivers.length) {
      this.errorMessage = 'Aucun chauffeur disponible';
      return;
    }

    this.isLoading = true;
    this.matchingService.findBestDrivers(this.rider, this.drivers, 3).subscribe({
      next: (response: any) => {
        this.matches = response.bestMatches;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du matching';
        this.isLoading = false;
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'green';
    if (score >= 60) return 'orange';
    return 'red';
  }

  contactDriver(phone: string) {
    window.open(`tel:${phone}`, '_self');
  }

  addDriver(): void {
    if (!this.newDriver.nom) {
      this.errorMessage = 'Veuillez renseigner le nom.';
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      this.newDriver.latitude = pos.coords.latitude;
      this.newDriver.longitude = pos.coords.longitude;

      this.driverService.addDriver(this.newDriver).subscribe({
        next: (saved) => {
          this.drivers.push(saved);
          this.updateMarkers();
          this.newDriver = { 
            ...this.newDriver, 
            nom: '', 
            capacity: 1,
            num_tel: ''
          };
        },
        error: () => (this.errorMessage = 'Erreur lors de l\'ajout du chauffeur.')
      });
    });
  }

  updateDriverPosition(driver: Driver) {
    if (!driver) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        driver.latitude = lat;
        driver.longitude = lng;

        this.driverService.updateDriverLocation(driver.id!, lat, lng).subscribe({
          next: () => {
            console.log(`Position de ${driver.nom} mise à jour : ${lat}, ${lng}`);
            this.updateMarkers();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la mise à jour de la position.';
          }
        });
      },
      (error) => {
        console.error('Erreur de géolocalisation chauffeur :', error);
        this.errorMessage = 'Impossible de récupérer la position du chauffeur.';
      }
    );
  }

  showDriverInfo(driver: Driver) {
    this.selectedDriver = driver;
  }
}