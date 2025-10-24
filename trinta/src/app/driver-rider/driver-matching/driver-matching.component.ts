import { Component } from '@angular/core';
import { RiderRequest } from '../RiderRequest';
import { Driver } from '../Driver';
import { MatchResult } from '../MatchResult';
import { DriverMatchingService } from '../../services/driver-matching.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-matching',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './driver-matching.component.html',
  styleUrl: './driver-matching.component.scss'
})
export class DriverMatchingComponent {
rider: RiderRequest = {
    id: '',
    latitude: 0,
    longitude: 0,
    passengerCount: 1,
    urgencyLevel: 'medium',
    maxWaitTime: 15
  };

  drivers: Driver[] = [];
  matches: MatchResult[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private matchingService: DriverMatchingService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.rider.latitude = position.coords.latitude;
          this.rider.longitude = position.coords.longitude;
          this.loadNearbyDrivers();
        },
        (error) => {
          console.error('Error getting location:', error);
          this.errorMessage = 'Impossible de récupérer votre position';
        }
      );
    }
  }

  loadNearbyDrivers() {
    this.isLoading = true;
    this.matchingService.getNearbyDrivers(
      this.rider.latitude, 
      this.rider.longitude
    ).subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.isLoading = false;
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

}
