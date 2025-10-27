import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseDataService, EventFeatures } from '../../services/supabase-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-event-features-dialog',
  providers: [SupabaseDataService],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  template: `
    <div class="edit-dialog">
      <h2 mat-dialog-title>
        <mat-icon>edit</mat-icon>
        Modifier l'Événement {{ data.event_id }}
      </h2>

      <mat-dialog-content>
        <form [formGroup]="editForm" class="edit-form">
          
          <!-- Event ID (disabled) -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>ID Événement</mat-label>
              <input matInput formControlName="event_id" readonly>
              <mat-hint>L'ID ne peut pas être modifié</mat-hint>
            </mat-form-field>
          </div>

          <!-- Durée et Trafic -->
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Durée totale (minutes) *</mat-label>
              <input matInput type="number" formControlName="total_duration">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Niveau de trafic *</mat-label>
              <input matInput type="number" step="0.1" formControlName="traffic_level">
            </mat-form-field>
          </div>

          <!-- Densité et Satisfaction -->
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Densité de foule *</mat-label>
              <input matInput type="number" step="0.1" formControlName="crowd_density">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Score de satisfaction (1-5) *</mat-label>
              <input matInput type="number" min="1" max="5" formControlName="satisfaction_score">
            </mat-form-field>
          </div>

          <!-- Âge et Budget -->
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Âge *</mat-label>
              <input matInput type="number" formControlName="age">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Catégorie de budget *</mat-label>
              <input matInput type="number" step="0.1" formControlName="budget_category">
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
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Préférence de route *</mat-label>
              <input matInput formControlName="optimal_route_preference">
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

          <!-- Message d'erreur -->
          <div *ngIf="errorMessage" class="error-message">
            <mat-icon color="warn">error</mat-icon>
            {{ errorMessage }}
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">
          <mat-icon>cancel</mat-icon>
          Annuler
        </button>
        
        <button 
          mat-raised-button 
          color="primary" 
          (click)="onSave()"
          [disabled]="editForm.invalid || isUpdating">
          <mat-icon>save</mat-icon>
          <span *ngIf="!isUpdating">Sauvegarder</span>
          <mat-spinner diameter="20" *ngIf="isUpdating"></mat-spinner>
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./edit-event-features-dialog.component.scss']
})
export class EditEventFeaturesDialogComponent implements OnInit {
  editForm!: FormGroup;
  isUpdating = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseDataService,
    private dialogRef: MatDialogRef<EditEventFeaturesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFeatures
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      event_id: [{value: this.data.event_id, disabled: true}, Validators.required],
      total_duration: [this.data.total_duration, [Validators.required, Validators.min(1)]],
      traffic_level: [this.data.traffic_level, [Validators.required, Validators.min(0)]],
      crowd_density: [this.data.crowd_density, [Validators.required, Validators.min(0)]],
      satisfaction_score: [this.data.satisfaction_score, [Validators.required, Validators.min(1), Validators.max(5)]],
      age: [this.data.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      budget_category: [this.data.budget_category, [Validators.required, Validators.min(0)]],
      weather: [this.data.weather, Validators.required],
      optimal_route_preference: [this.data.optimal_route_preference, Validators.required],
      gender: [this.data.gender, Validators.required],
      nationality: [this.data.nationality, Validators.required],
      travel_companions: [this.data.travel_companions, Validators.required],
      preferred_theme: [this.data.preferred_theme, Validators.required],
      preferred_transport: [this.data.preferred_transport, Validators.required]
    });
  }

  async onSave(): Promise<void> {
    if (this.editForm.invalid) {
      this.markFormGroupTouched(this.editForm);
      return;
    }

    this.isUpdating = true;
    this.errorMessage = '';

    try {
      const formData = { ...this.editForm.value };
      // Inclure l'event_id même s'il est disabled
      formData.event_id = this.data.event_id;
      
      console.log('🔄 Mise à jour de l\'événement:', formData);
      
      const result = await this.supabaseService.updateEventFeatures(this.data.event_id, formData);
      
      if (result) {
        console.log('✅ Événement mis à jour avec succès:', result);
        this.dialogRef.close({ success: true, data: result });
      } else {
        throw new Error('Aucune réponse du serveur');
      }
      
    } catch (error: any) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      this.errorMessage = 'Erreur lors de la mise à jour. Vérifiez vos données et réessayez.';
    } finally {
      this.isUpdating = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close({ success: false });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}