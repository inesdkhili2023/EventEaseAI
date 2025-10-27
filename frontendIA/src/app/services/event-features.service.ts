import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface EventFeatures {
  id: number;
  event_id: number;
  total_duration: number;
  traffic_level: number;
  crowd_density: number;
  satisfaction_score: number;
  age: number;
  budget_category: number;
  weather: string;
  optimal_route_preference: string;
  travel_companions: string;
  preferred_theme: string;
  preferred_transport: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventFeaturesService {

  constructor(
    private http: HttpClient, 
    private supabaseService: SupabaseService
  ) {}

  /**
   * Récupère les features d'un événement par son ID depuis Supabase
   */
  async getEventFeatures(eventId: number): Promise<EventFeatures | null> {
    try {
      const url = `${this.supabaseService.getRestUrl('event_features')}?event_id=eq.${eventId}&select=*`;
      const headers = this.supabaseService.getRequestHeaders();
      
      const response = await firstValueFrom(
        this.http.get<EventFeatures[]>(url, { headers })
      );

      if (response && response.length > 0) {
        return response[0];
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des features de l\'événement:', error);
      return null;
    }
  }

  /**
   * Récupère tous les event_ids disponibles (uniques)
   */
  async getAvailableEventIds(): Promise<number[]> {
    try {
      const url = `${this.supabaseService.getRestUrl('event_features')}?select=event_id`;
      const headers = this.supabaseService.getRequestHeaders();
      
      const response = await firstValueFrom(
        this.http.get<{ event_id: number }[]>(url, { headers })
      );

      // Récupérer seulement les IDs uniques
      const uniqueIds = [...new Set(response.map(item => item.event_id))];
      return uniqueIds.sort((a, b) => a - b); // Trier par ordre croissant
    } catch (error) {
      console.error('Erreur lors de la récupération des event_ids:', error);
      return [];
    }
  }

  /**
   * Récupère tous les événements disponibles
   */
  async getAllEvents(): Promise<{ event_id: number }[]> {
    try {
      const url = `${this.supabaseService.getRestUrl('event_features')}?select=event_id`;
      const headers = this.supabaseService.getRequestHeaders();
      
      const response = await firstValueFrom(
        this.http.get<{ event_id: number }[]>(url, { headers })
      );

      return response || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      return [];
    }
  }
}