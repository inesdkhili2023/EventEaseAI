import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin  } from 'rxjs';

export interface FraudResult {
  fraud_score: number;
  is_fraud: boolean;
  breakdown: {
    description: number;
    price: number;
    capacity: number;
    dates: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FraudService {

  private apiUrl = 'http://127.0.0.1:8000/check-fraud';

  constructor(private http: HttpClient) {}

   checkFraudForEvents(events: any[]): Observable<any[]> {
    const requests = events.map(event =>
      this.http.post(this.apiUrl, event)
    );
    return forkJoin(requests); // attend que tous les scores soient récupérés
  }
}
