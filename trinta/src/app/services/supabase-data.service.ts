import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EventFeatures {
  id?: number;
  event_id: number;
  total_duration?: number;
  traffic_level?: number;
  crowd_density?: number;
  satisfaction_score?: number;
  age?: number;
  budget_category?: number;
  weather?: string;
  optimal_route_preference?: string;
  gender?: string;
  nationality?: string;
  travel_companions?: string;
  preferred_theme?: string;
  preferred_transport?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseDataService {
  private baseUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`
    });
  }

  /**
   * Test de connexion à Supabase
   */
  async testConnection(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/rest/v1/`;
      const headers = this.getHeaders();
      
      console.log('🔍 Test de connexion Supabase...');
      console.log('URL:', url);
      console.log('Headers:', headers.keys());
      
      const response = await firstValueFrom(
        this.http.get(url, { headers })
      );
      
      console.log('✅ Connexion Supabase OK:', response);
      return true;
    } catch (error) {
      console.error('❌ Erreur connexion Supabase:', error);
      return false;
    }
  }

  /**
   * Récupère la liste de toutes les tables disponibles
   */
  async getTables(): Promise<string[]> {
    try {
      // Essayons d'abord quelques noms de tables courants
      const possibleTables = ['event_features', 'events', 'features', 'logistics_needs', 'predictions'];
      const existingTables = [];

      for (const tableName of possibleTables) {
        try {
          const url = `${this.baseUrl}/rest/v1/${tableName}?limit=1`;
          await firstValueFrom(
            this.http.get(url, { headers: this.getHeaders() })
          );
          existingTables.push(tableName);
          console.log(`✅ Table trouvée: ${tableName}`);
        } catch (error) {
          console.log(`❌ Table non trouvée: ${tableName}`);
        }
      }

      return existingTables;
    } catch (error) {
      console.error('Erreur lors de la vérification des tables:', error);
      return [];
    }
  }

  /**
   * Récupère les event_ids disponibles depuis la table event_features
   */
  async getAvailableEventIds(): Promise<number[]> {
    try {
      const url = `${this.baseUrl}/rest/v1/event_features?select=event_id`;
      const headers = this.getHeaders();
      
      console.log('🔍 Récupération des event_ids depuis:', url);
      
      const response = await firstValueFrom(
        this.http.get<EventFeatures[]>(url, { headers })
      );
      
      console.log('📦 Réponse Supabase:', response);
      
      if (Array.isArray(response)) {
        const uniqueIds = [...new Set(response.map(item => item.event_id))];
        const sortedIds = uniqueIds.filter(id => id != null).sort((a, b) => a - b);
        
        console.log('✅ Event IDs récupérés:', sortedIds);
        return sortedIds;
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des event_ids:', error);
      console.error('Détails:', {
        status: (error as any)?.status,
        message: (error as any)?.message,
        error: (error as any)?.error
      });
      return [];
    }
  }

  /**
   * Récupère les features d'un événement spécifique
   */
  async getEventFeatures(eventId: number): Promise<EventFeatures | null> {
    try {
      const url = `${this.baseUrl}/rest/v1/event_features?event_id=eq.${eventId}&limit=1`;
      const headers = this.getHeaders();
      
      console.log(`🔍 Récupération des features pour event_id ${eventId}`);
      
      const response = await firstValueFrom(
        this.http.get<EventFeatures[]>(url, { headers })
      );
      
      if (response && response.length > 0) {
        console.log(`✅ Features trouvées pour event_id ${eventId}:`, response[0]);
        return response[0];
      }
      
      console.log(`❌ Aucune feature trouvée pour event_id ${eventId}`);
      return null;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des features pour event_id ${eventId}:`, error);
      return null;
    }
  }

  /**
   * Ajoute un nouvel événement avec ses features dans Supabase
   */
  async addEventFeatures(eventData: EventFeatures): Promise<EventFeatures | null> {
    try {
      // Supabase nécessite le paramètre select pour retourner les données insérées
      const url = `${this.baseUrl}/rest/v1/event_features?select=*`;
      const headers = this.getHeaders();
      
      // Ajouter le header Prefer pour retourner l'objet créé
      const headersWithPrefer = new HttpHeaders({
        ...headers.keys().reduce((acc, key) => {
          acc[key] = headers.get(key) || '';
          return acc;
        }, {} as any),
        'Prefer': 'return=representation'
      });
      
      console.log('🔄 Ajout d\'un nouvel événement:', eventData);
      console.log('URL POST:', url);
      
      const response = await firstValueFrom(
        this.http.post<EventFeatures[]>(url, eventData, { headers: headersWithPrefer })
      );
      
      console.log('✅ Événement ajouté avec succès:', response);
      
      // Supabase retourne un array même pour une insertion
      if (response && Array.isArray(response) && response.length > 0) {
        return response[0];
      } else {
        console.log('✅ Insertion réussie (pas de données retournées)');
        return eventData; // Retourner les données originales si pas de réponse
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout de l\'événement:', error);
      
      // Gestion des erreurs spécifiques
      if ((error as any)?.status === 409) {
        throw new Error(`Event ID ${eventData.event_id} already exists (duplicate key)`);
      }
      
      if ((error as any)?.status === 401) {
        throw new Error('Authentication failed - check your Supabase API key');
      }
      
      if ((error as any)?.status === 400) {
        throw new Error('Invalid data format or missing required fields');
      }
      
      if ((error as any)?.status === 201) {
        // Code 201 = création réussie
        console.log('✅ Création réussie (code 201)');
        return eventData;
      }
      
      throw error;
    }
  }

  /**
   * Met à jour un événement existant
   */
  async updateEventFeatures(eventId: number, eventData: Partial<EventFeatures>): Promise<EventFeatures | null> {
    try {
      const url = `${this.baseUrl}/rest/v1/event_features?event_id=eq.${eventId}&select=*`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      });
      
      console.log(`🔄 Mise à jour de l'événement ${eventId}:`, eventData);
      console.log('URL PATCH:', url);
      
      const response = await firstValueFrom(
        this.http.patch<EventFeatures[]>(url, eventData, { headers })
      );
      
      console.log('✅ Réponse Supabase PATCH:', response);
      
      if (Array.isArray(response) && response.length > 0) {
        console.log('✅ Événement mis à jour avec succès:', response[0]);
        return response[0];
      }
      
      // Si pas de réponse, récupérer les données mises à jour
      console.log('🔍 Récupération des données mises à jour...');
      return await this.getEventFeatures(eventId);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'événement ${eventId}:`, error);
      
      // Gestion des erreurs spécifiques
      if ((error as any)?.status === 404) {
        throw new Error(`Event ID ${eventId} not found`);
      }
      
      if ((error as any)?.status === 401) {
        throw new Error('Authentication failed - check your Supabase API key');
      }
      
      if ((error as any)?.status === 400) {
        throw new Error('Invalid data format or missing required fields');
      }
      
      throw error;
    }
  }

  /**
   * Supprime un événement
   */
  async deleteEventFeatures(eventId: number): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/rest/v1/event_features?event_id=eq.${eventId}`;
      const headers = this.getHeaders();
      
      console.log(`🔄 Suppression de l'événement ${eventId}`);
      
      await firstValueFrom(
        this.http.delete(url, { headers })
      );
      
      console.log(`✅ Événement ${eventId} supprimé avec succès`);
      return true;
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de l'événement ${eventId}:`, error);
      return false;
    }
  }

  /**
   * Récupère tous les événements avec leurs features
   */
  async getAllEventFeatures(limit?: number, offset?: number): Promise<EventFeatures[]> {
    try {
      let url = `${this.baseUrl}/rest/v1/event_features?select=*&order=event_id.desc`;
      
      // Ajouter pagination si spécifiée
      if (limit) {
        url += `&limit=${limit}`;
      }
      if (offset) {
        url += `&offset=${offset}`;
      }
      
      const headers = this.getHeaders();
      
      console.log('🔍 Récupération de tous les event_features depuis:', url);
      
      const response = await firstValueFrom(
        this.http.get<EventFeatures[]>(url, { headers })
      );
      
      console.log('✅ Event features récupérés:', response?.length || 0, 'éléments');
      return response || [];
      
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de tous les event_features:', error);
      console.error('Détails:', {
        status: (error as any)?.status,
        message: (error as any)?.message,
        error: (error as any)?.error
      });
      return [];
    }
  }

  /**
   * Compte le nombre total d'événements
   */
  async getEventFeaturesCount(): Promise<number> {
    try {
      const url = `${this.baseUrl}/rest/v1/event_features?select=count()`;
      const headers = this.getHeaders();
      
      const response = await firstValueFrom(
        this.http.get<any[]>(url, { headers })
      );
      
      return response?.[0]?.count || 0;
    } catch (error) {
      console.error('❌ Erreur lors du comptage des event_features:', error);
      return 0;
    }
  }
}