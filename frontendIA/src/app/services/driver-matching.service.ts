import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RiderRequest } from '../driver-rider/RiderRequest';
import { Driver } from '../driver-rider/Driver';


@Injectable({
  providedIn: 'root'
})
export class DriverMatchingService {

   private apiUrl = 'http://localhost:8092/api/matching';

  constructor(private http: HttpClient) { }

  findBestDrivers(rider: RiderRequest, drivers: Driver[], topK: number = 3): Observable<any> {
    const request = {
      rider: rider,
      drivers: drivers,
      topK: topK
    };

    return this.http.post(`${this.apiUrl}/find-best-drivers`, request);
  }

  getNearbyDrivers(latitude: number, longitude: number, radiusKm: number = 50): Observable<Driver[]> {
    return this.http.get<Driver[]>(
      `${this.apiUrl}/nearby-drivers?lat=${latitude}&lng=${longitude}&radius=${radiusKm}`
    );
  }
}
