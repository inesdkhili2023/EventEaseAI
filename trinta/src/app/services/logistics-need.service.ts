import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogisticsNeed } from '../models/logistics-need.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticsNeedService {
  private apiUrl = 'http://localhost:8090/api/users';

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8090/api/users';
  }

  // Créer un nouveau besoin logistique
  createLogisticsNeed(need: LogisticsNeed): Observable<LogisticsNeed> {
    return this.http.post<LogisticsNeed>(`${this.apiUrl}/logistics`, need);
  }

  // Obtenir tous les besoins logistiques
  getAllLogisticsNeeds(): Observable<LogisticsNeed[]> {
    return this.http.get<LogisticsNeed[]>(`${this.apiUrl}/logistics`);
  }

  // Obtenir les besoins logistiques par eventId
  getLogisticsNeedsByEvent(eventId: number): Observable<LogisticsNeed[]> {
    return this.http.get<LogisticsNeed[]>(`${this.apiUrl}/logistics?eventId=${eventId}`);
  }

  // Obtenir un besoin logistique par ID
  getLogisticsNeed(id: number): Observable<LogisticsNeed> {
    return this.http.get<LogisticsNeed>(`${this.apiUrl}/logistics/${id}`);
  }

  // Mettre à jour un besoin logistique
  updateLogisticsNeed(id: number, need: LogisticsNeed): Observable<LogisticsNeed> {
    return this.http.put<LogisticsNeed>(`${this.apiUrl}/logistics/${id}`, need);
  }

  // Supprimer un besoin logistique
  deleteLogisticsNeed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/logistics/${id}`);
  }
}