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
  imports: [FormsModule, CommonModule],
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
    experienceYears: 2,
    responseTime: 5,
    available: true,
    numTel: '',
    imageUrl: ''
  };
  
  matches: MatchResult[] = [];
  isLoading = false;
  selectedDriver: Driver | null = null;
  errorMessage = '';
  
  // --- Map control
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private mapInitialized = false;

  constructor(
    private matchingService: DriverMatchingService,
    private driverService: DriverTrackingService
  ) {}

  ngOnInit() {
    this.getUserLocation();
    this.loadDrivers();
  }
  
  ngAfterViewInit(): void {
    // Petit délai pour s'assurer que le DOM est complètement rendu
    setTimeout(() => {
      this.initMap();
    }, 100);
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
      console.log('Carte initialisée avec succès');

      // Mettre à jour les marqueurs une fois la carte initialisée
      if (this.drivers.length > 0) {
        this.updateMarkers();
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  }

  private updateMarkers(): void {
    if (!this.map) {
      console.warn('Carte non initialisée');
      return;
    }

    // Supprime les anciens marqueurs
    this.markers.forEach(m => this.map?.removeLayer(m));
    this.markers = [];

    // Ajoute les marqueurs chauffeurs
    this.drivers.forEach(d => {
      if (d.latitude && d.longitude) {
        const marker = L.marker([d.latitude, d.longitude])
          .addTo(this.map!)
          .bindPopup(`
            <b>${d.nom}</b><br>
            🚗 ${d.vehicleType} - ${d.capacity} places<br>
            ⭐ ${d.rating}/5<br>
            📞 ${d.numTel || 'Non renseigné'}
          `);
        this.markers.push(marker);
      }
    });

    // Ajoute la position du rider
    if (this.rider.latitude && this.rider.longitude) {
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
            this.loadNearbyDrivers();
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
        this.updateMarkers();
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
            numTel: ''
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