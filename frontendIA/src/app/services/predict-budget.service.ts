import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

export interface PredictionRequest {
  event_id?: number;
  Total_Duration: number;
  Traffic_Level: number;
  Crowd_Density: number;
  Satisfaction_Score: number;
  Age: number;
  Budget_Category: number;
  Weather: string;
  Optimal_Route_Preference: string;
  Gender: string;
  Nationality: string;
  Travel_Companions: string;
  Preferred_Theme: string;
  Preferred_Transport: string;
}

export interface PredictionResponse {
  prediction_tnd: number;
  prediction_log: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictBudgetService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  /**
   * Vérifie si l'API Flask est disponible
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ status: string }>(`${this.apiUrl}/health`)
      );
      return response.status === 'ok';
    } catch (error) {
      console.error('API Flask non disponible:', error);
      return false;
    }
  }

  /**
   * Fait une prédiction de budget via l'API Flask
   */
  async predictBudget(data: PredictionRequest): Promise<PredictionResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    try {
      // Vérifier d'abord si l'API est disponible
      const isHealthy = await this.checkHealth();
      if (!isHealthy) {
        throw new Error('L\'API de prédiction n\'est pas disponible. Assurez-vous que le serveur Flask est démarré.');
      }

      // Exclure event_id des données envoyées à l'API (utilisé uniquement pour l'auto-complétion)
      const { event_id, ...predictionData } = data;

      const response = await firstValueFrom(
        this.http.post<PredictionResponse>(`${this.apiUrl}/predict`, predictionData, { headers })
      );

      return response;
    } catch (error: any) {
      console.error('Erreur lors de la prédiction:', error);
      
      if (error.status === 0) {
        throw new Error('Impossible de se connecter à l\'API de prédiction. Vérifiez que le serveur Flask est démarré sur le port 5001.');
      } else if (error.status === 400) {
        throw new Error('Données invalides: ' + (error.error?.error || 'Vérifiez les champs saisis.'));
      } else if (error.status === 500) {
        throw new Error('Erreur du serveur de prédiction: ' + (error.error?.error || 'Erreur interne.'));
      } else {
        throw new Error(error.message || 'Une erreur inattendue s\'est produite.');
      }
    }
  }

  /**
   * Obtient des données d'exemple pour tester la prédiction
   */
  getExampleData(): PredictionRequest {
    return {
      event_id: 123,
      Total_Duration: 480,
      Traffic_Level: 1.0,
      Crowd_Density: 1.1,
      Satisfaction_Score: 4,
      Age: 32,
      Budget_Category: 1.0,
      Weather: "Sunny",
      Optimal_Route_Preference: "3->24->27",
      Gender: "Female",
      Nationality: "France",
      Travel_Companions: "Group",
      Preferred_Theme: "Cultural",
      Preferred_Transport: "Walk"
    };
  }
}