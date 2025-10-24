import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PredictBudgetService } from '../../services/predict-budget.service';
import { EventFeaturesService, EventFeatures } from '../../services/event-features.service';
import { SupabaseDataService } from '../../services/supabase-data.service';
import { EventFeaturesBackendService } from '../../services/event-features-backend.service';

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

@Component({
  selector: 'app-predict-budget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="predict-budget-container">
      <mat-card class="prediction-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>analytics</mat-icon>
            Prédiction de Budget Logistique
          </mat-card-title>
          <mat-card-subtitle>
            Utilisez l'IA pour estimer automatiquement le budget nécessaire
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="predictionForm" (ngSubmit)="onPredict()" class="prediction-form">
            <!-- Sélection d'événement -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>ID Événement *</mat-label>
                <mat-select formControlName="event_id" 
                           (selectionChange)="onEventIdSelected($event)"
                           [disabled]="isLoadingEvent">
                  <mat-option *ngFor="let eventId of availableEventIds" [value]="eventId">
                    Événement {{ eventId }}
                  </mat-option>
                </mat-select>
                <mat-hint>Sélectionnez un événement pour auto-compléter les champs</mat-hint>
                <mat-spinner diameter="20" *ngIf="isLoadingEvent" matSuffix></mat-spinner>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Durée totale (minutes)</mat-label>
                <input matInput type="number" formControlName="Total_Duration" placeholder="480">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Niveau de trafic</mat-label>
                <input matInput type="number" step="0.1" formControlName="Traffic_Level" placeholder="1.0">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Densité de foule</mat-label>
                <input matInput type="number" step="0.1" formControlName="Crowd_Density" placeholder="1.1">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Score de satisfaction (1-5)</mat-label>
                <input matInput type="number" min="1" max="5" formControlName="Satisfaction_Score" placeholder="4">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Âge</mat-label>
                <input matInput type="number" formControlName="Age" placeholder="32">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Catégorie de budget</mat-label>
                <input matInput type="number" step="0.1" formControlName="Budget_Category" placeholder="1.0">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Météo</mat-label>
                <mat-select formControlName="Weather">
                  <mat-option value="Sunny">Ensoleillé</mat-option>
                  <mat-option value="Cloudy">Nuageux</mat-option>
                  <mat-option value="Rainy">Pluvieux</mat-option>
                  <mat-option value="Stormy">Orageux</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Préférence de route</mat-label>
                <input matInput formControlName="Optimal_Route_Preference" placeholder="3->24->27">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Compagnons de voyage</mat-label>
                <mat-select formControlName="Travel_Companions">
                  <mat-option value="Solo">Seul</mat-option>
                  <mat-option value="Couple">En couple</mat-option>
                  <mat-option value="Family">En famille</mat-option>
                  <mat-option value="Group">En groupe</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Thème préféré</mat-label>
                <mat-select formControlName="Preferred_Theme">
                  <mat-option value="Cultural">Culturel</mat-option>
                  <mat-option value="Adventure">Aventure</mat-option>
                  <mat-option value="Relaxation">Relaxation</mat-option>
                  <mat-option value="Business">Affaires</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Transport préféré</mat-label>
                <mat-select formControlName="Preferred_Transport">
                  <mat-option value="Walk">À pied</mat-option>
                  <mat-option value="Car">Voiture</mat-option>
                  <mat-option value="Bus">Bus</mat-option>
                  <mat-option value="Train">Train</mat-option>
                  <mat-option value="Bike">Vélo</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Genre</mat-label>
                <mat-select formControlName="Gender">
                  <mat-option value="Male">Homme</mat-option>
                  <mat-option value="Female">Femme</mat-option>
                  <mat-option value="Other">Autre</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Nationalité</mat-label>
                <mat-select formControlName="Nationality">
                  <mat-option value="France">France</mat-option>
                  <mat-option value="Tunisia">Tunisie</mat-option>
                  <mat-option value="Algeria">Algérie</mat-option>
                  <mat-option value="Morocco">Maroc</mat-option>
                  <mat-option value="Italy">Italie</mat-option>
                  <mat-option value="Spain">Espagne</mat-option>
                  <mat-option value="Germany">Allemagne</mat-option>
                  <mat-option value="Other">Autre</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button 
                mat-raised-button 
                color="accent" 
                type="button" 
                (click)="loadTestData()"
                class="test-button">
                <mat-icon>science</mat-icon>
                Charger Données Test
              </button>

              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="predictionForm.invalid || isLoading"
                class="predict-button">
                <mat-icon>smart_toy</mat-icon>
                <span *ngIf="!isLoading">Prédire le Budget</span>
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
              </button>
            </div>
          </form>

          <!-- Résultat de la prédiction -->
          <div *ngIf="predictionResult" class="prediction-result">
            <mat-card class="result-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon color="primary">calculate</mat-icon>
                  Résultat de la Prédiction
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="result-content">
                  <div class="budget-amount">
                    <span class="currency">TND</span>
                    <span class="amount">{{ predictionResult.prediction_tnd | number:'1.2-2' }}</span>
                  </div>
                  <p class="result-description">
                    Budget estimé pour vos besoins logistiques basé sur l'analyse IA
                  </p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Message d'erreur -->
          <div *ngIf="errorMessage" class="error-message">
            <mat-icon color="warn">error</mat-icon>
            {{ errorMessage }}
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./predict-budget.component.scss']
})
export class PredictBudgetComponent implements OnInit {
  predictionForm!: FormGroup;
  predictionResult: PredictionResponse | null = null;
  isLoading = false;
  errorMessage = '';
  availableEvents: { event_id: number }[] = [];
  availableEventIds: number[] = [];
  isLoadingEvent = false;

  constructor(
    private fb: FormBuilder,
    private predictService: PredictBudgetService,
    private eventFeaturesService: EventFeaturesService,
    private supabaseService: SupabaseDataService,
    private backendService: EventFeaturesBackendService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.loadAvailableEventIds();
  }

  /**
   * Charge la liste des event_ids disponibles depuis Supabase
   */
  async loadAvailableEventIds(): Promise<void> {
    try {
      this.isLoadingEvent = true;
      console.log('🔄 Chargement des event_ids depuis Supabase...');
      
      // Récupérons les event_ids depuis Supabase directement
      this.availableEventIds = await this.supabaseService.getAvailableEventIds();
      console.log('✅ Event IDs chargés depuis Supabase:', this.availableEventIds);
      
      if (this.availableEventIds.length === 0) {
        // Si pas d'événements trouvés, utilisons ceux vus dans vos captures
        this.availableEventIds = [123, 2, 3, 4];
        console.log('📋 Utilisation des event_ids de vos captures:', this.availableEventIds);
        this.errorMessage = 'Utilisation de données d\'exemple (vérifiez votre clé API Supabase)';
      } else {
        this.errorMessage = ''; // Effacer les erreurs précédentes
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des event_ids:', error);
      
      // Fallback avec les IDs visibles dans vos captures d'écran
      this.availableEventIds = [123, 2, 3, 4];
      console.log('🔧 Fallback: utilisation des event_ids de vos captures');
      this.errorMessage = 'Connexion Supabase échouée - utilisation de données d\'exemple';
    } finally {
      this.isLoadingEvent = false;
    }
  }

  initForm(): void {
    this.predictionForm = this.fb.group({
      event_id: [null, Validators.required], // Sera rempli depuis la liste déroulante
      Total_Duration: [480, [Validators.required, Validators.min(1)]],
      Traffic_Level: [1.0, [Validators.required, Validators.min(0)]],
      Crowd_Density: [1.1, [Validators.required, Validators.min(0)]],
      Satisfaction_Score: [4, [Validators.required, Validators.min(1), Validators.max(5)]],
      Age: [32, [Validators.required, Validators.min(1), Validators.max(120)]],
      Budget_Category: [1.0, [Validators.required, Validators.min(0)]],
      Weather: ['Sunny', Validators.required],
      Optimal_Route_Preference: ['3->24->27', Validators.required],
      Gender: ['Female', Validators.required],
      Nationality: ['France', Validators.required],
      Travel_Companions: ['Group', Validators.required],
      Preferred_Theme: ['Cultural', Validators.required],
      Preferred_Transport: ['Walk', Validators.required]
    });

    // Écouter les changements de l'event_id pour auto-compléter
    this.predictionForm.get('event_id')?.valueChanges.subscribe(async (eventId) => {
      if (eventId && typeof eventId === 'number' && eventId > 0) {
        await this.loadEventData(eventId);
      }
    });
  }

  async loadEventData(eventId: number): Promise<void> {
    this.isLoadingEvent = true;
    try {
      console.log(`🔄 Chargement des données pour event_id: ${eventId}`);
      
      const eventData = await this.supabaseService.getEventFeatures(eventId);
      if (eventData) {
        console.log('✅ Données événement récupérées depuis Supabase:', eventData);
        
        // Auto-compléter tous les champs avec les données de l'événement
        this.predictionForm.patchValue({
          Total_Duration: eventData.total_duration,
          Traffic_Level: eventData.traffic_level,
          Crowd_Density: eventData.crowd_density,
          Satisfaction_Score: eventData.satisfaction_score,
          Age: eventData.age,
          Budget_Category: eventData.budget_category,
          Weather: eventData.weather,
          Optimal_Route_Preference: eventData.optimal_route_preference,
          Gender: eventData.gender || 'Female',
          Nationality: eventData.nationality || 'France',
          Travel_Companions: eventData.travel_companions,
          Preferred_Theme: eventData.preferred_theme,
          Preferred_Transport: eventData.preferred_transport
        });
        
        console.log('✅ Formulaire mis à jour avec les données de l\'événement');
        this.errorMessage = ''; // Effacer les erreurs
      } else {
        console.log('❌ Aucune donnée trouvée pour cet événement');
        this.errorMessage = `Aucune donnée trouvée pour l'événement ${eventId}`;
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données de l\'événement:', error);
      this.errorMessage = 'Impossible de charger les données de cet événement.';
    } finally {
      this.isLoadingEvent = false;
    }
  }



  /**
   * Gère la sélection d'un event_id depuis la liste déroulante
   */
  async onEventIdSelected(event: any): Promise<void> {
    const eventId = event.value;
    if (eventId && typeof eventId === 'number' && eventId > 0) {
      await this.loadEventData(eventId);
    }
  }

  loadTestData(): void {
    // Charger des données de test prédéfinies
    this.predictionForm.patchValue({
      event_id: 123,
      Total_Duration: 480,
      Traffic_Level: 1.0,
      Crowd_Density: 1.1,
      Satisfaction_Score: 4,
      Age: 32,
      Budget_Category: 1.0,
      Weather: 'Sunny',
      Optimal_Route_Preference: '3->24->27',
      Gender: 'Female',
      Nationality: 'France',
      Travel_Companions: 'Group',
      Preferred_Theme: 'Cultural',
      Preferred_Transport: 'Walk'
    });
  }

  async onPredict(): Promise<void> {
    if (this.predictionForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.predictionResult = null;

    try {
      const formData: PredictionRequest = this.predictionForm.value;
      const result = await this.predictService.predictBudget(formData);
      this.predictionResult = result;
    } catch (error: any) {
      console.error('Erreur lors de la prédiction:', error);
      this.errorMessage = 'Une erreur est survenue lors de la prédiction. Veuillez réessayer.';
    } finally {
      this.isLoading = false;
    }
  }
}