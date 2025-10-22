import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modèle TypeScript de ton Partnership
export interface Partnership {
  id?: number;
  name: string;
  type: string;
  description: string;
  contractValue: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  images?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PartnershipService {

  // URL de ton backend Spring Boot
  private baseUrl = 'http://localhost:8081/api/partnerships';

  constructor(private http: HttpClient) { }

  // 🔹 Créer un nouveau partenaire
create(partnership: any): Observable<any> {
return this.http.post(
  this.baseUrl,
  partnership,
  { headers: { 'Content-Type': 'application/json' } } // obligatoire
);
}





  // 🔹 Récupérer tous les partenaires
  getAll(): Observable<Partnership[]> {
    return this.http.get<Partnership[]>(this.baseUrl);
  }

  // 🔹 Récupérer un partenaire par ID
  getById(id: number): Observable<Partnership> {
    return this.http.get<Partnership>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Mettre à jour un partenaire
  update(id: number, partnership: Partnership): Observable<Partnership> {
    return this.http.put<Partnership>(`${this.baseUrl}/${id}`, partnership);
  }

  // 🔹 Supprimer un partenaire
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

assignToEvent(partnershipId: number, eventId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/${partnershipId}/assign-event/${eventId}`, {});
}


    // 🔹 Nouvelle méthode : Obtenir les recommandations d'événements pour un partenaire
  getRecommendedEvents(partnershipId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/${partnershipId}/recommended-events`);
  }
}
