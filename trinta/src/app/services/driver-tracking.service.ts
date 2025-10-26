import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../driver-rider/Driver';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverTrackingService {

   private apiUrl = 'http://localhost:8090/api/drivers';

  constructor(private http: HttpClient) {}

  // Dans driver-tracking.service.ts
getAllDrivers(): Observable<Driver[]> {
  console.log('Appel API pour tous les chauffeurs');
  return this.http.get<Driver[]>(`${this.apiUrl}/all`).pipe(
    tap(drivers => console.log('Réponse API - chauffeurs reçus:', drivers))
  );
}

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiUrl}/add`, driver);
  }

  updateDriverLocation(id: string, latitude: number, longitude: number): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${id}/update-location`, {
      latitude, longitude
    });
  }

  getDriverById(id: string): Observable<Driver> {
  return this.http.get<Driver>(`${this.apiUrl}/${id}`);
}


 updateDriver(id: string, driver: Driver): Observable<Driver> {
  return this.http.put<Driver>(`${this.apiUrl}/update/${id}`, driver);
}
getDriverByEmail(email: string): Observable<Driver> {
  return this.http.get<Driver>(`${this.apiUrl}/email/${email}`);
}

}
