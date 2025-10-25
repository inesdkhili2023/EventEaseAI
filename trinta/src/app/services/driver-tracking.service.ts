import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../driver-rider/Driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverTrackingService {

   private apiUrl = 'http://localhost:8090/api/drivers';

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/all`);
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiUrl}/add`, driver);
  }

  updateDriverLocation(id: string, latitude: number, longitude: number): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${id}/update-location`, {
      latitude, longitude
    });
  }
}
