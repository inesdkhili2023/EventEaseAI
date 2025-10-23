// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8090/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // PUT - Mettre à jour un événement existant
  updateEvent(id: number, event: Event): Observable<Event> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE - Supprimer un événement
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  // Gestion des erreurs
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
 
}
 export enum EventCategory {
  SPORTIF = 'SPORTIF',
  CULTUREL = 'CULTUREL',
  EDUCATIF = 'EDUCATIF',
  TECHNOLOGIQUE = 'TECHNOLOGIQUE',
  SOCIAL = 'SOCIAL',
  AUTRE = 'AUTRE'
}
export interface Event {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  capacity: number;
  organizerId: number;
  images: string[];
  price: number;
  partnerships?: Partnership[]; // 🔹 Added for ManyToMany relation

  fraud_score?: number; // 🔹 Ajouté ici

}
export interface Partnership {
  id: number;
  name: string;
  logoUrl?: string; // optional, if you have a logo or other details
}