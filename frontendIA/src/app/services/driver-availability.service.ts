// driver-availability.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DriverAvailability {
  id?: string;
  driverId?: string;
  driverName?: string;
  date: string; // Format: "2024-01-15"
  startTime: string; // Format: "09:00"
  endTime: string; // Format: "14:00"
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DriverAvailabilityService {
  private apiUrl = 'http://localhost:8092/api/availabilities';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les disponibilités
  getAllAvailabilities(startDate?: string, endDate?: string): Observable<DriverAvailability[]> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this.http.get<DriverAvailability[]>(this.apiUrl, { params });
  }

  // Ajouter une disponibilité - CORRIGÉ selon votre backend
  addAvailability(availabilityData: any): Observable<DriverAvailability> {
    return this.http.post<DriverAvailability>(this.apiUrl, availabilityData);
  }

  // Récupérer les disponibilités d'un chauffeur spécifique
  getDriverAvailabilities(driverId: string, startDate?: string, endDate?: string): Observable<DriverAvailability[]> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this.http.get<DriverAvailability[]>(`${this.apiUrl}/driver/${driverId}`, { params });
  }

  // Supprimer une disponibilité
  deleteAvailability(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une disponibilité
  updateAvailability(id: string, availability: DriverAvailability): Observable<DriverAvailability> {
    return this.http.put<DriverAvailability>(`${this.apiUrl}/${id}`, availability);
  }
}