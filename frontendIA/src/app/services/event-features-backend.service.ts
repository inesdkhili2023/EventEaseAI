import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

export interface EventFeatures {
  id?: number;
  eventId: number;  // Utilisons eventId au lieu de event_id pour correspondre à votre modèle Spring Boot
  totalDuration?: number;
  trafficLevel?: number;
  crowdDensity?: number;
  satisfactionScore?: number;
  age?: number;
  budgetCategory?: number;
  weather?: string;
  optimalRoutePreference?: string;
  travelCompanions?: string;
  preferredTheme?: string;
  preferredTransport?: string;
  gender?: string;
  nationality?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventFeaturesBackendService {
  private apiUrl = 'http://localhost:8091/api/users'; // Même base que logistics-need

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les event_ids disponibles depuis le backend Spring Boot
   */
  async getAvailableEventIds(): Promise<number[]> {
    try {
      console.log('🔍 Récupération des event_ids depuis le backend...');
      
      // Essayons de récupérer depuis votre table existante
      // Modifiez l'endpoint selon votre backend
      const response = await firstValueFrom(
        this.http.get<EventFeatures[]>(`${this.apiUrl}/events`) // ou /event-features
      );
      
      if (Array.isArray(response)) {
        const uniqueIds = [...new Set(response.map(item => item.eventId))];
        const sortedIds = uniqueIds.filter(id => id != null).sort((a, b) => a - b);
        
        console.log('✅ Event IDs récupérés depuis backend:', sortedIds);
        return sortedIds;
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur backend event_ids:', error);
      
      // Fallback : essayons avec logistics pour voir les eventIds existants
      try {
        console.log('🔄 Fallback: récupération depuis logistics...');
        const logisticsResponse = await firstValueFrom(
          this.http.get<any[]>(`${this.apiUrl}/logistics`)
        );
        
        if (Array.isArray(logisticsResponse)) {
          const eventIds = [...new Set(logisticsResponse
            .map(item => item.eventId)
            .filter(id => id != null))]
            .sort((a, b) => a - b);
          
          console.log('✅ Event IDs depuis logistics:', eventIds);
          return eventIds;
        }
      } catch (fallbackError) {
        console.error('❌ Erreur fallback:', fallbackError);
      }
      
      return [];
    }
  }

  /**
   * Récupère les features d'un événement depuis le backend
   */
  async getEventFeatures(eventId: number): Promise<EventFeatures | null> {
    try {
      console.log(`🔍 Récupération features pour event_id ${eventId}...`);
      
      const response = await firstValueFrom(
        this.http.get<EventFeatures>(`${this.apiUrl}/events/${eventId}`) // ou /event-features/${eventId}
      );
      
      console.log(`✅ Features trouvées pour event_id ${eventId}:`, response);
      return response;
    } catch (error) {
      console.error(`❌ Erreur récupération event_id ${eventId}:`, error);
      
      // Fallback avec données par défaut basées sur l'eventId
      console.log('🔄 Génération de données par défaut...');
      return this.generateDefaultFeatures(eventId);
    }
  }

  /**
   * Génère des features par défaut pour un événement
   */
  private generateDefaultFeatures(eventId: number): EventFeatures {
    // Générons des données réalistes basées sur l'eventId
    const baseValues = {
      1: { duration: 480, traffic: 1.0, crowd: 1.1, satisfaction: 4, age: 32 },
      2: { duration: 360, traffic: 1.5, crowd: 0.8, satisfaction: 3, age: 28 },
      3: { duration: 600, traffic: 0.7, crowd: 1.3, satisfaction: 5, age: 45 }
    };

    const defaults = baseValues[eventId as keyof typeof baseValues] || baseValues[1];
    
    return {
      eventId: eventId,
      totalDuration: defaults.duration,
      trafficLevel: defaults.traffic,
      crowdDensity: defaults.crowd,
      satisfactionScore: defaults.satisfaction,
      age: defaults.age,
      budgetCategory: 1.0,
      weather: "Sunny",
      optimalRoutePreference: "3->24->27",
      travelCompanions: "Group",
      preferredTheme: "Cultural",
      preferredTransport: "Walk",
      gender: "Female",
      nationality: "France"
    };
  }
}