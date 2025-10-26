import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DriverTrackingService } from '../../services/driver-tracking.service';
import { Driver } from '../Driver';

// Configuration Leaflet
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl, iconUrl, shadowUrl,
  iconSize: [25, 41], iconAnchor: [12, 41],
  popupAnchor: [1, -34], shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-modify-driver',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './modify-driver.component.html',
  styleUrls: ['./modify-driver.component.scss']
})
export class ModifyDriverComponent implements AfterViewInit, OnInit {

  driver: Driver = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    num_tel: '',
    date_naissance: '',
    adresse: '',
    vehicleType: 'Standard',
    capacity: 4,
    experienceYears: 2,
    pricePerKm: 1.2,
    latitude: 0,
    longitude: 0,
    available: true,
    password: '',
    image_url: '',
    rating: 0,
    responseTime: 0
  };

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  constructor(
    private driverService: DriverTrackingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDriverData();
    this.updateDriver();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 200);
  }

  // Charger les données actuelles du chauffeur
  loadDriverData() {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    this.snackBar.open('⚠️ Aucun utilisateur connecté.', 'Fermer', { duration: 3000 });
    return;
  }

  this.driverService.getDriverByEmail(email).subscribe({
    next: (driver) => {
      this.driver = driver;
      if (this.map && driver.latitude && driver.longitude) {
        this.addMarker(driver.latitude, driver.longitude);
        this.map.setView([driver.latitude, driver.longitude], 13);
      }
    },
    error: () => {
      this.snackBar.open('❌ Impossible de charger les informations du chauffeur.', 'Fermer', { duration: 3000 });
    }
  });
}

  // Initialiser la carte
  initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    this.map = L.map(mapEl).setView([36.8065, 10.1815], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter le marqueur si position existante
    if (this.driver.latitude && this.driver.longitude) {
      this.addMarker(this.driver.latitude, this.driver.longitude);
    }

    // Écoute du clic pour mise à jour de position
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.driver.latitude = lat;
      this.driver.longitude = lng;
      this.addMarker(lat, lng);
      this.snackBar.open('📍 Position mise à jour', 'Fermer', { duration: 2000 });
    });
  }

  addMarker(lat: number, lng: number) {
    if (this.marker && this.map) this.map.removeLayer(this.marker);
    this.marker = L.marker([lat, lng]).addTo(this.map!);
  }

  // Soumettre la mise à jour
 updateDriver() {
  if (!this.driver.id) {
    this.snackBar.open('⚠️ ID du chauffeur manquant.', 'Fermer', {
      duration: 3000,
      panelClass: ['toast-error']
    });
    return;
  }

  this.driverService.updateDriver(this.driver.id, this.driver).subscribe({
    next: () => {
      this.snackBar.open('✅ Informations mises à jour avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['toast-success']
      });
    },
    error: () => {
      this.snackBar.open('❌ Erreur lors de la mise à jour.', 'Fermer', {
        duration: 3000,
        panelClass: ['toast-error']
      });
    }
  });
}
}
