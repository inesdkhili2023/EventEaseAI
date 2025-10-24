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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SupabaseDataService, EventFeatures } from '../../services/supabase-data.service';
import { Router } from '@angular/router';

export interface EventFeaturesAdd {
  event_id: number;
  total_duration: number;
  traffic_level: number;
  crowd_density: number;
  satisfaction_score: number;
  age: number;
  budget_category: number;
  weather: string;
  optimal_route_preference: string;
  gender: string;
  nationality: string;
  travel_companions: string;
  preferred_theme: string;
  preferred_transport: string;
}

@Component({
  selector: 'app-add-event-features',
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
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="add-event-features-container">
      <mat-card class="add-event-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>add_circle</mat-icon>
            Ajouter des Caractéristiques d'Événement
          </mat-card-title>
          <mat-card-subtitle>
            Créer une nouvelle entrée dans la base de données event_features
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="event-form">
            
            <!-- Event ID -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>ID Événement *</mat-label>
                <input matInput type="number" formControlName="event_id" placeholder="Ex: 125">
                <mat-hint *ngIf="!hasError('event_id')">Identifiant unique de l'événement (1-99999)</mat-hint>
                <mat-error *ngIf="hasError('event_id')">{{ getErrorMessage('event_id') }}</mat-error>
              </mat-form-field>
            </div>

            <!-- Durée et Trafic -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Durée totale (minutes) *</mat-label>
                <input matInput type="number" formControlName="total_duration" placeholder="480">
                <mat-hint *ngIf="!hasError('total_duration')">Entre 15 min et 24h (1440 min)</mat-hint>
                <mat-error *ngIf="hasError('total_duration')">{{ getErrorMessage('total_duration') }}</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Niveau de trafic *</mat-label>
                <input matInput type="number" step="0.1" formControlName="traffic_level" placeholder="1.0">
                <mat-hint *ngIf="!hasError('traffic_level')">De 0.1 à 5.0</mat-hint>
                <mat-error *ngIf="hasError('traffic_level')">{{ getErrorMessage('traffic_level') }}</mat-error>
              </mat-form-field>
            </div>

            <!-- Densité et Satisfaction -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Densité de foule *</mat-label>
                <input matInput type="number" step="0.1" formControlName="crowd_density" placeholder="1.1">
                <mat-hint *ngIf="!hasError('crowd_density')">De 0.1 à 10.0</mat-hint>
                <mat-error *ngIf="hasError('crowd_density')">{{ getErrorMessage('crowd_density') }}</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Score de satisfaction (1-5) *</mat-label>
                <input matInput type="number" min="1" max="5" formControlName="satisfaction_score" placeholder="4">
                <mat-hint *ngIf="!hasError('satisfaction_score')">Note de 1 (très mauvais) à 5 (excellent)</mat-hint>
                <mat-error *ngIf="hasError('satisfaction_score')">{{ getErrorMessage('satisfaction_score') }}</mat-error>
              </mat-form-field>
            </div>

            <!-- Âge et Budget -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Âge *</mat-label>
                <input matInput type="number" formControlName="age" placeholder="32">
                <mat-hint *ngIf="!hasError('age')">Entre 5 et 120 ans</mat-hint>
                <mat-error *ngIf="hasError('age')">{{ getErrorMessage('age') }}</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Catégorie de budget *</mat-label>
                <input matInput type="number" step="0.1" formControlName="budget_category" placeholder="1.0">
                <mat-hint *ngIf="!hasError('budget_category')">De 0.1 (économique) à 5.0 (premium)</mat-hint>
                <mat-error *ngIf="hasError('budget_category')">{{ getErrorMessage('budget_category') }}</mat-error>
              </mat-form-field>
            </div>

            <!-- Météo et Route -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Météo *</mat-label>
                <mat-select formControlName="weather">
                  <mat-option value="Sunny">Ensoleillé</mat-option>
                  <mat-option value="Cloudy">Nuageux</mat-option>
                  <mat-option value="Rainy">Pluvieux</mat-option>
                  <mat-option value="Stormy">Orageux</mat-option>
                </mat-select>
                <mat-error *ngIf="hasError('weather')">{{ getErrorMessage('weather') }}</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Préférence de route *</mat-label>
                <input matInput formControlName="optimal_route_preference" placeholder="3->24->27">
                <mat-hint *ngIf="!hasError('optimal_route_preference')">Format: chiffres séparés par -> (ex: 3->24->27)</mat-hint>
                <mat-error *ngIf="hasError('optimal_route_preference')">{{ getErrorMessage('optimal_route_preference') }}</mat-error>
              </mat-form-field>
            </div>

            <!-- Compagnons et Thème -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Compagnons de voyage *</mat-label>
                <mat-select formControlName="travel_companions">
                  <mat-option value="Solo">Seul</mat-option>
                  <mat-option value="Couple">En couple</mat-option>
                  <mat-option value="Family">En famille</mat-option>
                  <mat-option value="Group">En groupe</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Thème préféré *</mat-label>
                <mat-select formControlName="preferred_theme">
                  <mat-option value="Cultural">Culturel</mat-option>
                  <mat-option value="Adventure">Aventure</mat-option>
                  <mat-option value="Relaxation">Relaxation</mat-option>
                  <mat-option value="Business">Affaires</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Transport et Genre -->
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Transport préféré *</mat-label>
                <mat-select formControlName="preferred_transport">
                  <mat-option value="Walk">À pied</mat-option>
                  <mat-option value="Car">Voiture</mat-option>
                  <mat-option value="Bus">Bus</mat-option>
                  <mat-option value="Train">Train</mat-option>
                  <mat-option value="Bike">Vélo</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Genre *</mat-label>
                <mat-select formControlName="gender">
                  <mat-option value="Male">Homme</mat-option>
                  <mat-option value="Female">Femme</mat-option>
                  <mat-option value="Other">Autre</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Nationalité -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nationalité *</mat-label>
                <mat-select formControlName="nationality">
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

            <!-- Actions -->
            <div class="form-actions">
              <button 
                mat-raised-button 
                color="accent" 
                type="button" 
                (click)="loadSampleData()"
                class="sample-button">
                <mat-icon>science</mat-icon>
                Charger Exemple
              </button>

              <button 
                mat-raised-button 
                color="warn" 
                type="button" 
                (click)="resetForm()"
                class="reset-button">
                <mat-icon>refresh</mat-icon>
                Réinitialiser
              </button>

              <button 
                mat-raised-button 
                color="primary" 
                type="button" 
                (click)="goToList()"
                class="list-button">
                <mat-icon>list</mat-icon>
                Check List
              </button>

              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="eventForm.invalid || isSubmitting"
                class="submit-button">
                <mat-icon>save</mat-icon>
                <span *ngIf="!isSubmitting">Sauvegarder</span>
                <mat-spinner diameter="20" *ngIf="isSubmitting"></mat-spinner>
              </button>
            </div>
          </form>

          <!-- Message d'erreur -->
          <div *ngIf="errorMessage" class="error-message">
            <mat-icon color="warn">error</mat-icon>
            {{ errorMessage }}
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./add-event-features.component.scss']
})
export class AddEventFeaturesComponent implements OnInit {
  eventForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupRealTimeValidation();
  }

  setupRealTimeValidation(): void {
    // Validation en temps réel pour les champs critiques
    this.eventForm.get('event_id')?.valueChanges.subscribe(value => {
      if (value && (value < 1 || value > 99999)) {
        this.eventForm.get('event_id')?.setErrors({ 'range': true });
      }
    });

    this.eventForm.get('total_duration')?.valueChanges.subscribe(value => {
      if (value && (value < 15 || value > 1440)) {
        this.eventForm.get('total_duration')?.setErrors({ 'range': true });
      }
    });

    this.eventForm.get('satisfaction_score')?.valueChanges.subscribe(value => {
      if (value && (value < 1 || value > 5)) {
        this.eventForm.get('satisfaction_score')?.setErrors({ 'range': true });
      }
    });

    this.eventForm.get('age')?.valueChanges.subscribe(value => {
      if (value && (value < 5 || value > 120)) {
        this.eventForm.get('age')?.setErrors({ 'range': true });
      }
    });
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      event_id: [
        null, 
        [
          Validators.required, 
          Validators.min(1), 
          Validators.max(99999),
          Validators.pattern(/^\d+$/) // Seulement des chiffres
        ]
      ],
      total_duration: [
        480, 
        [
          Validators.required, 
          Validators.min(15), 
          Validators.max(1440), // Max 24h en minutes
          Validators.pattern(/^\d+$/)
        ]
      ],
      traffic_level: [
        1.0, 
        [
          Validators.required, 
          Validators.min(0.1), 
          Validators.max(5.0),
          Validators.pattern(/^\d+(\.\d{1,2})?$/) // Nombre avec max 2 décimales
        ]
      ],
      crowd_density: [
        1.1, 
        [
          Validators.required, 
          Validators.min(0.1), 
          Validators.max(10.0),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      satisfaction_score: [
        4, 
        [
          Validators.required, 
          Validators.min(1), 
          Validators.max(5),
          Validators.pattern(/^[1-5]$/) // Seulement 1,2,3,4,5
        ]
      ],
      age: [
        32, 
        [
          Validators.required, 
          Validators.min(5), 
          Validators.max(120),
          Validators.pattern(/^\d+$/)
        ]
      ],
      budget_category: [
        1.0, 
        [
          Validators.required, 
          Validators.min(0.1), 
          Validators.max(5.0),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      weather: ['Sunny', [Validators.required]],
      optimal_route_preference: [
        '3->24->27', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[\d\-\>]+$/) // Format: chiffres, -> et -
        ]
      ],
      gender: ['Female', [Validators.required]],
      nationality: ['France', [Validators.required]],
      travel_companions: ['Group', [Validators.required]],
      preferred_theme: ['Cultural', [Validators.required]],
      preferred_transport: ['Walk', [Validators.required]]
    });
  }

  loadSampleData(): void {
    // Générer un event_id aléatoire pour éviter les conflits
    const randomEventId = Math.floor(Math.random() * 1000) + 100;
    
    this.eventForm.patchValue({
      event_id: randomEventId,
      total_duration: 480,
      traffic_level: 1.2,
      crowd_density: 1.5,
      satisfaction_score: 4,
      age: 28,
      budget_category: 1.5,
      weather: 'Sunny',
      optimal_route_preference: '5->12->18',
      gender: 'Male',
      nationality: 'Tunisia',
      travel_companions: 'Family',
      preferred_theme: 'Adventure',
      preferred_transport: 'Car'
    });
  }

  resetForm(): void {
    this.eventForm.reset();
    this.initForm();
    this.errorMessage = '';
  }

  async onSubmit(): Promise<void> {
    if (this.eventForm.invalid) {
      this.markFormGroupTouched(this.eventForm);
      this.showValidationErrors();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const formData: EventFeatures = this.eventForm.value;
      console.log('🔄 Ajout des données event_features:', formData);
      
      const result = await this.supabaseService.addEventFeatures(formData);
      
      // La réponse peut être null mais l'ajout peut quand même être réussi
      console.log('✅ Données ajoutées avec succès:', result);
      
      this.snackBar.open(
        `Événement ${formData.event_id} ajouté avec succès !`, 
        'Fermer', 
        { 
          duration: 3000,
          panelClass: ['success-snackbar']
        }
      );
      
      // Réinitialiser le formulaire après succès
      this.resetForm();
      
      // Optionnel: rediriger vers la page de prédiction
      // this.router.navigate(['/dashboard/predict-budget']);
      
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'ajout:', error);
      
      if (error.message?.includes('duplicate key')) {
        this.errorMessage = `L'événement ${this.eventForm.value.event_id} existe déjà. Utilisez un autre ID.`;
      } else {
        this.errorMessage = 'Erreur lors de l\'ajout. Vérifiez vos données et réessayez.';
      }
      
      this.snackBar.open(
        'Erreur lors de l\'ajout de l\'événement', 
        'Fermer', 
        { 
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  goToList(): void {
    this.router.navigate(['/list-event-features']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Méthodes pour récupérer les messages d'erreur
  getErrorMessage(fieldName: string): string {
    const control = this.eventForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} est requis`;
      }
      if (control.errors['min']) {
        return `${this.getFieldLabel(fieldName)} doit être >= ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `${this.getFieldLabel(fieldName)} doit être <= ${control.errors['max'].max}`;
      }
      if (control.errors['pattern']) {
        return `Format invalide pour ${this.getFieldLabel(fieldName)}`;
      }
      if (control.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} doit contenir au moins ${control.errors['minlength'].requiredLength} caractères`;
      }
      if (control.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'event_id': 'ID Événement',
      'total_duration': 'Durée totale',
      'traffic_level': 'Niveau de trafic',
      'crowd_density': 'Densité de foule',
      'satisfaction_score': 'Score de satisfaction',
      'age': 'Âge',
      'budget_category': 'Catégorie de budget',
      'weather': 'Météo',
      'optimal_route_preference': 'Préférence de route',
      'gender': 'Genre',
      'nationality': 'Nationalité',
      'travel_companions': 'Compagnons de voyage',
      'preferred_theme': 'Thème préféré',
      'preferred_transport': 'Transport préféré'
    };
    return labels[fieldName] || fieldName;
  }

  // Vérifier si un champ a une erreur
  hasError(fieldName: string): boolean {
    const control = this.eventForm.get(fieldName);
    return !!(control?.errors && control?.touched);
  }

  showValidationErrors(): void {
    const errorFields: string[] = [];
    Object.keys(this.eventForm.controls).forEach(key => {
      const control = this.eventForm.get(key);
      if (control?.errors) {
        errorFields.push(this.getFieldLabel(key));
      }
    });

    if (errorFields.length > 0) {
      const errorMessage = `Erreurs dans les champs: ${errorFields.join(', ')}`;
      this.snackBar.open(
        errorMessage,
        'Fermer',
        {
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    }
  }
}