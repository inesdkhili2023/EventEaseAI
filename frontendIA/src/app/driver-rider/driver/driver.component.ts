import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Driver } from '../Driver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DriverTrackingService } from '../../services/driver-tracking.service';
import {  MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';



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
  selector: 'app-driver',
  providers: [DriverTrackingService],
  standalone: true,
  imports: [FormsModule, CommonModule,  MatCardModule, FeathericonsModule, MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatSnackBarModule,HttpClientModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements AfterViewInit,  OnDestroy {
  drivers: Driver[] = [];
  newDriver: Driver = {
    id: '',
    nom: '',
    prenom: '',
    vehicleType: 'Standard',
    capacity: 4,
    latitude: 0,
    longitude: 0,
    rating: 4.5,
    pricePerKm: 1.2,
    experienceYears: 2,
    responseTime: 5,
    available: true,
    num_tel: '',
    image_url: '',
    email: '',
    password: '',
    date_naissance: '',
    adresse: ''
  };
  
  selectedDriver: Driver | null = null;
  errorMessage = '';
  successMessage = '';
  
  // Variables pour la sélection de position
  showPositionMap = false;
  selectedPosition: { lat: number, lng: number } | null = null;
  private positionMarker: L.Marker | null = null;
  private positionMap: L.Map | null = null; // Nouvelle carte pour le modal
   positionTouched: boolean = false;
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private mapInitialized = false;

  constructor(private driverService: DriverTrackingService,
     private snackBar: MatSnackBar
  ) {}

  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMainMap();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    if (this.positionMap) {
      this.positionMap.remove();
    }
  }

  private initMainMap(): void {
    if (this.mapInitialized) return;
    
    try {
      const mapElement = document.getElementById('driver-map');
      if (!mapElement) {
        console.error('Élément map principal non trouvé');
        return;
      }

      this.map = L.map('driver-map').setView([36.8065, 10.1815], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.mapInitialized = true;
      console.log('Carte principale initialisée avec succès');

      this.updateMarkers();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte principale:', error);
    }
  }

  private initPositionMap(): void {
    if (this.positionMap) {
      this.positionMap.remove();
      this.positionMap = null;
    }

    setTimeout(() => {
      try {
        const positionMapElement = document.getElementById('position-map');
        if (!positionMapElement) {
          console.error('Élément position-map non trouvé');
          return;
        }

        // Initialiser la carte de position
        this.positionMap = L.map('position-map').setView([36.8065, 10.1815], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.positionMap);

        // Ajouter l'écouteur de clic sur la carte
        this.positionMap.on('click', (e: L.LeafletMouseEvent) => {
          this.onPositionMapClick(e);
        });

        console.log('Carte de position initialisée avec succès');

        // Centrer sur la position actuelle si disponible
        if (this.newDriver.latitude && this.newDriver.longitude) {
          this.positionMap.setView([this.newDriver.latitude, this.newDriver.longitude], 15);
          this.addPositionMarker(this.newDriver.latitude, this.newDriver.longitude, 'Position actuelle');
        } else {
          this.centerOnCurrentLocation();
        }

      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte de position:', error);
      }
    }, 300); // Délai pour s'assurer que le modal est rendu
  }

  private onPositionMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    this.selectedPosition = { lat, lng };
    
    // Mettre à jour le formulaire
    this.newDriver.latitude = lat;
    this.newDriver.longitude = lng;

    // Ajouter le marqueur sur la carte de position
    this.addPositionMarker(lat, lng, '📍 Position sélectionnée');

    console.log('Position sélectionnée:', lat, lng);
  }

  private addPositionMarker(lat: number, lng: number, message: string): void {
    // Supprimer l'ancien marqueur
    if (this.positionMarker && this.positionMap) {
      this.positionMap.removeLayer(this.positionMarker);
    }

    // Ajouter le nouveau marqueur
    if (this.positionMap) {
      this.positionMarker = L.marker([lat, lng])
        .addTo(this.positionMap)
        .bindPopup(message)
        .openPopup();
    }
  }

  private updateMarkers(): void {
    if (!this.map) return;

    this.markers.forEach(m => this.map?.removeLayer(m));
    this.markers = [];

    this.drivers.forEach(d => {
      if (d.latitude && d.longitude && d.latitude !== 0 && d.longitude !== 0) {
        const driverName = `${d.nom} ${d.prenom}`.trim() || 'Chauffeur sans nom';
        const marker = L.marker([d.latitude, d.longitude])
          .addTo(this.map!)
          .bindPopup(`
            <b>${driverName}</b><br>
            🚗 ${d.vehicleType} - ${d.capacity} places<br>
            ⭐ ${d.rating}/5<br>
            📞 ${d.num_tel || 'Non renseigné'}<br>
            📧 ${d.email || 'Non renseigné'}
          `)
          .on('click', () => {
            this.selectedDriver = d;
          });
        this.markers.push(marker);
      }
    });

    if (this.markers.length > 0) {
      const group = new L.FeatureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          this.newDriver.latitude = lat;
          this.newDriver.longitude = lng;
          this.selectedPosition = { lat, lng };
          
          this.successMessage = 'Position actuelle récupérée avec succès!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          console.error('Erreur géolocalisation:', error);
          this.errorMessage = 'Impossible de récupérer votre position actuelle.';
        }
      );
    } else {
      this.errorMessage = 'La géolocalisation n\'est pas supportée par votre navigateur.';
    }
  }

  centerOnCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          if (this.positionMap) {
            this.positionMap.setView([lat, lng], 15);
            this.addPositionMarker(lat, lng, '📍 Votre position actuelle');
          }
        },
        (error) => {
          console.error('Erreur centrage sur position:', error);
        }
      );
    }
  }

  openPositionMap(): void {
    this.positionTouched = true;
    this.showPositionMap = true;
    setTimeout(() => {
      this.initPositionMap();
    }, 100);
  }

  closePositionMap(): void {
    this.showPositionMap = false;
    // Ne pas réinitialiser la position sélectionnée
    if (this.positionMap) {
      // On garde la carte en mémoire mais on peut la supprimer si nécessaire
      // this.positionMap.remove();
      // this.positionMap = null;
    }
    if (this.positionMarker) {
      this.positionMarker = null;
    }
  }

  useCurrentLocation(): void {
    this.getCurrentLocation();
    this.closePositionMap();
  }

  validatePosition(): void {
  this.positionTouched = true; // ← Assurez-vous que c'est là
  if (this.selectedPosition) {
    this.closePositionMap();
    this.successMessage = 'Position validée avec succès!';
    setTimeout(() => this.successMessage = '', 3000);
  } else {
    this.errorMessage = 'Veuillez sélectionner une position sur la carte.';
  }
}

 
addDriver(): void {
  this.positionTouched = true;

  if (!this.newDriver.nom || !this.newDriver.prenom || !this.newDriver.email || !this.newDriver.password) {
    this.snackBar.open('⚠️ Veuillez remplir tous les champs obligatoires.', 'Fermer', {
      duration: 3000,
      panelClass: ['toast-error']
    });
    return;
  }

  if (!this.newDriver.latitude || !this.newDriver.longitude) {
    this.snackBar.open('⚠️ Veuillez sélectionner une position sur la carte.', 'Fermer', {
      duration: 3000,
      panelClass: ['toast-error']
    });
    return;
  }

  this.driverService.addDriver(this.newDriver).subscribe({
    next: (saved) => {
      this.drivers.push(saved);
      this.updateMarkers();

      this.newDriver = {
        id: '',
        nom: '',
        prenom: '',
        vehicleType: 'Standard',
        capacity: 4,
        latitude: 0,
        longitude: 0,
        rating: 4.5,
        pricePerKm: 1.2,
        experienceYears: 2,
        responseTime: 5,
        available: true,
        num_tel: '',
        image_url: '',
        email: '',
        password: '',
        date_naissance: '',
        adresse: ''
      };

      this.selectedPosition = null;
      this.positionTouched = false;

      this.snackBar.open('✅ Chauffeur ajouté avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['toast-success']
      });
    },
    error: (error) => {
      console.error('Erreur ajout chauffeur:', error);
      this.snackBar.open('❌ Erreur lors de l’ajout du chauffeur.', 'Fermer', {
        duration: 3000,
        panelClass: ['toast-error']
      });
    }
  });
}


  updateDriverPosition(driver: Driver) {
    if (!driver) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        this.driverService.updateDriverLocation(driver.id!, lat, lng).subscribe({
          next: (updatedDriver) => {
            const index = this.drivers.findIndex(d => d.id === driver.id);
            if (index !== -1) {
              this.drivers[index] = { ...this.drivers[index], latitude: lat, longitude: lng };
            }
            console.log(`Position de ${driver.nom} mise à jour : ${lat}, ${lng}`);
            this.updateMarkers();
            this.successMessage = 'Position mise à jour avec succès!';
            
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          },
          error: (error) => {
            console.error('Erreur mise à jour position:', error);
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