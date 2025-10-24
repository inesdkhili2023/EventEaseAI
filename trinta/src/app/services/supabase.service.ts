import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly supabaseUrl = 'https://sovevtdhjfpkycbieywv.supabase.co';
  // Pour la clé anon, nous devrons la récupérer depuis votre dashboard Supabase
  // En attendant, nous utiliserons une clé temporaire pour tester la structure
  private readonly anonKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

  constructor(private http: HttpClient) {}

  /**
   * Crée les headers nécessaires pour les requêtes Supabase REST API
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.anonKey,
      'Authorization': `Bearer ${this.anonKey}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Obtient l'URL de base pour les requêtes REST
   */
  getRestUrl(table: string): string {
    return `${this.supabaseUrl}/rest/v1/${table}`;
  }

  /**
   * Obtient les headers pour les requêtes
   */
  getRequestHeaders(): HttpHeaders {
    return this.getHeaders();
  }
}