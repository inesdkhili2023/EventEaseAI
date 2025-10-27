import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseDataService, EventFeatures } from '../../services/supabase-data.service';
import { EditEventFeaturesDialogComponent } from '../edit-event-features-dialog/edit-event-features-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-event-features',
  providers: [SupabaseDataService],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  template: `
    <div class="list-event-features-container">
      <mat-card class="list-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>list</mat-icon>
            Liste des Caractéristiques d'Événements
          </mat-card-title>
          <mat-card-subtitle>
            Gérer et consulter toutes les données event_features
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Actions et recherche -->
          <div class="list-actions">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Rechercher par Event ID</mat-label>
              <input matInput [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Ex: 123">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            
            <div class="action-buttons">
              <button 
                mat-raised-button 
                color="accent" 
                (click)="loadEventFeatures()"
                [disabled]="isLoading">
                <mat-icon>refresh</mat-icon>
                Actualiser
              </button>
              
              <button 
                mat-raised-button 
                color="primary" 
                (click)="goToAddForm()">
                <mat-icon>add</mat-icon>
                Ajouter Nouveau
              </button>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="stats-row" *ngIf="totalCount > 0">
            <mat-chip-set>
              <mat-chip>
                <mat-icon>event</mat-icon>
                {{ totalCount }} événements
              </mat-chip>
              <mat-chip color="accent" *ngIf="filteredData.length !== totalCount">
                <mat-icon>search</mat-icon>
                {{ filteredData.length }} résultats
              </mat-chip>
            </mat-chip-set>
          </div>

          <!-- Tableau des données -->
          <div class="table-container" *ngIf="!isLoading">
            <table mat-table [dataSource]="paginatedData" class="event-features-table">
              
              <!-- Event ID -->
              <ng-container matColumnDef="event_id">
                <th mat-header-cell *matHeaderCellDef class="header-cell">ID Événement</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  <strong>{{ element.event_id }}</strong>
                </td>
              </ng-container>

              <!-- Durée -->
              <ng-container matColumnDef="total_duration">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Durée (min)</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  {{ element.total_duration }}
                </td>
              </ng-container>

              <!-- Trafic -->
              <ng-container matColumnDef="traffic_level">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Trafic</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  {{ element.traffic_level | number:'1.1-1' }}
                </td>
              </ng-container>

              <!-- Densité -->
              <ng-container matColumnDef="crowd_density">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Densité</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  {{ element.crowd_density | number:'1.1-1' }}
                </td>
              </ng-container>

              <!-- Satisfaction -->
              <ng-container matColumnDef="satisfaction_score">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Satisfaction</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  <span class="satisfaction-score">
                    {{ element.satisfaction_score }}/5
                  </span>
                </td>
              </ng-container>

              <!-- Âge -->
              <ng-container matColumnDef="age">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Âge</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  {{ element.age }}
                </td>
              </ng-container>

              <!-- Météo -->
              <ng-container matColumnDef="weather">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Météo</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  <mat-chip [style.background-color]="getWeatherColor(element.weather)">
                    {{ getWeatherLabel(element.weather) }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Nationalité -->
              <ng-container matColumnDef="nationality">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Nationalité</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  {{ element.nationality }}
                </td>
              </ng-container>

              <!-- Actions -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="header-cell">Actions</th>
                <td mat-cell *matCellDef="let element" class="data-cell">
                  <button 
                    mat-icon-button 
                    color="primary" 
                    (click)="viewDetails(element)"
                    matTooltip="Voir détails">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button 
                    mat-icon-button 
                    color="accent" 
                    (click)="editEvent(element)"
                    matTooltip="Modifier">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button 
                    mat-icon-button 
                    color="warn" 
                    (click)="deleteEvent(element)"
                    matTooltip="Supprimer">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
            </table>
          </div>

          <!-- Pagination -->
          <mat-paginator 
            *ngIf="!isLoading && totalCount > 0"
            [length]="filteredData.length"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 25, 50]"
            (page)="onPageChange($event)"
            showFirstLastButtons>
          </mat-paginator>

          <!-- Spinner de chargement -->
          <div *ngIf="isLoading" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Chargement des données...</p>
          </div>

          <!-- Message si aucune donnée -->
          <div *ngIf="!isLoading && totalCount === 0" class="no-data">
            <mat-icon>inbox</mat-icon>
            <h3>Aucune donnée trouvée</h3>
            <p>Commencez par ajouter des caractéristiques d'événements</p>
            <button mat-raised-button color="primary" (click)="goToAddForm()">
              <mat-icon>add</mat-icon>
              Ajouter le premier événement
            </button>
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
  styleUrls: ['./list-event-features.component.scss']
})
export class ListEventFeaturesComponent implements OnInit {
  eventFeatures: EventFeatures[] = [];
  filteredData: EventFeatures[] = [];
  paginatedData: EventFeatures[] = [];
  
  displayedColumns: string[] = [
    'event_id', 'total_duration', 'traffic_level', 'crowd_density', 
    'satisfaction_score', 'age', 'weather', 'nationality', 'actions'
  ];
  
  totalCount = 0;
  isLoading = false;
  errorMessage = '';
  
  // Pagination
  pageSize = 10;
  pageIndex = 0;
  
  // Recherche
  searchTerm = '';

  constructor(
    private supabaseService: SupabaseDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEventFeatures();
  }

  async loadEventFeatures(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      console.log('🔄 Chargement de toutes les event_features...');
      
      const data = await this.supabaseService.getAllEventFeatures();
      this.eventFeatures = data;
      this.totalCount = data.length;
      
      console.log('✅ Event features chargés:', this.totalCount, 'éléments');
      
      // Appliquer le filtre et la pagination
      this.applyFilter();
      
    } catch (error: any) {
      console.error('❌ Erreur lors du chargement:', error);
      this.errorMessage = 'Impossible de charger les données. Vérifiez votre connexion.';
      
      this.snackBar.open(
        'Erreur lors du chargement des données', 
        'Fermer', 
        { 
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(): void {
    this.pageIndex = 0; // Reset à la première page lors de la recherche
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = [...this.eventFeatures];
    } else {
      const searchId = parseInt(this.searchTerm.trim());
      if (!isNaN(searchId)) {
        this.filteredData = this.eventFeatures.filter(item => 
          item.event_id === searchId
        );
      } else {
        this.filteredData = [...this.eventFeatures];
      }
    }
    
    this.updatePaginatedData();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  viewDetails(event: EventFeatures): void {
    // Afficher les détails dans un dialog ou naviguer vers une page de détails
    console.log('Voir détails:', event);
    
    this.snackBar.open(
      `Détails de l'événement ${event.event_id}`, 
      'Fermer', 
      { duration: 3000 }
    );
  }

  editEvent(event: EventFeatures): void {
    console.log('Modifier événement:', event);
    
    const dialogRef = this.dialog.open(EditEventFeaturesDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: event,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.success) {
        console.log('✅ Événement mis à jour:', result.data);
        
        this.snackBar.open(
          `Événement ${event.event_id} mis à jour avec succès !`, 
          'Fermer', 
          { 
            duration: 3000,
            panelClass: ['success-snackbar']
          }
        );
        
        // Recharger les données pour refléter les changements
        await this.loadEventFeatures();
      }
    });
  }

  async deleteEvent(event: EventFeatures): Promise<void> {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'événement ${event.event_id} ?`)) {
      return;
    }

    try {
      console.log('🗑️ Suppression de l\'événement:', event.event_id);
      
      const success = await this.supabaseService.deleteEventFeatures(event.event_id);
      
      if (success) {
        this.snackBar.open(
          `Événement ${event.event_id} supprimé avec succès`, 
          'Fermer', 
          { 
            duration: 3000,
            panelClass: ['success-snackbar']
          }
        );
        
        // Recharger la liste
        await this.loadEventFeatures();
      } else {
        throw new Error('Échec de la suppression');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
      
      this.snackBar.open(
        'Erreur lors de la suppression', 
        'Fermer', 
        { 
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    }
  }

  goToAddForm(): void {
    this.router.navigate(['/add-event-features']);
  }

  getWeatherColor(weather: string): string {
    const colors: { [key: string]: string } = {
      'Sunny': '#FFA726',
      'Cloudy': '#90A4AE',
      'Rainy': '#42A5F5',
      'Stormy': '#7E57C2'
    };
    return colors[weather] || '#9E9E9E';
  }

  getWeatherLabel(weather: string): string {
    const labels: { [key: string]: string } = {
      'Sunny': 'Ensoleillé',
      'Cloudy': 'Nuageux',
      'Rainy': 'Pluvieux',
      'Stormy': 'Orageux'
    };
    return labels[weather] || weather;
  }
}