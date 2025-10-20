import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnershipService, Partnership } from '../../../services/partnership.service';
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
    selector: 'app-e-sellers',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        CommonModule,
        FilterPipe
    ],
    templateUrl: './e-sellers.component.html',
    styleUrls: ['./e-sellers.component.scss']
})
export class ESellersComponent implements OnInit {
    partnerships: Partnership[] = [];
    isLoading = false;

    constructor(
        private partnershipService: PartnershipService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadPartnerships();
    }

    loadPartnerships(): void {
        this.isLoading = true;
        this.partnershipService.getAll().subscribe({
            next: (data) => {
                this.partnerships = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading partnerships:', error);
                this.showMessage('Erreur lors du chargement des partenariats', 'error');
                this.isLoading = false;
            }
        });
    }

    onAdd(): void {
        // Navigation vers le composant de formulaire d'ajout
        this.router.navigate(['/partnerships/add']);
    }

    onEdit(partnership: Partnership): void {
        // Navigation vers le composant de formulaire d'édition
        this.router.navigate(['/partnerships/edit', partnership.id]);
    }

    onDelete(partnership: Partnership): void {
        const dialogRef = this.dialog.open(DeleteConfirmDialog, {
            width: '400px',
            data: { 
                title: 'Supprimer le partenariat',
                message: `Êtes-vous sûr de vouloir supprimer "${partnership.name}" ?`,
                confirmText: 'Supprimer',
                cancelText: 'Annuler'
            }
        });

        dialogRef.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.partnershipService.delete(partnership.id!).subscribe({
                    next: () => {
                        this.showMessage('Partenariat supprimé avec succès', 'success');
                        this.loadPartnerships();
                    },
                    error: (error) => {
                        console.error('Error deleting partnership:', error);
                        this.showMessage('Erreur lors de la suppression', 'error');
                    }
                });
            }
        });
    }

    viewDetails(partnership: Partnership): void {
        const dialogRef = this.dialog.open(PartnershipDetailsDialog, {
            width: '700px',
            maxHeight: '90vh',
            data: partnership
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result?.action === 'edit') {
                this.onEdit(result.data);
            }
        });
    }

    onAssignEvent(partnership: Partnership): void {
        const dialogRef = this.dialog.open(AssignEventDialog, {
            width: '600px',
            data: partnership
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.partnershipService.assignToEvent(partnership.id!, result.eventId).subscribe({
                    next: () => {
                        this.showMessage('Partenariat assigné à l\'événement avec succès', 'success');
                        this.loadPartnerships();
                    },
                    error: (error) => {
                        console.error('Error assigning partnership:', error);
                        this.showMessage('Erreur lors de l\'assignation', 'error');
                    }
                });
            }
        });
    }

    showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
        this.snackBar.open(message, 'Fermer', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: [`snackbar-${type}`]
        });
    }

    getStatusColor(active: boolean): string {
        return active ? 'primary' : 'warn';
    }

    formatDate(date: Date | string): string {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    calculateTotalValue(): number {
        return this.partnerships.reduce((sum, p) => sum + (p.contractValue || 0), 0);
    }
}

// ============================================
// DIALOG 1: DELETE CONFIRMATION
// ============================================
@Component({
    selector: 'delete-confirm-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
    template: `
        <div class="delete-dialog">
            <div class="dialog-icon">
                <mat-icon>warning</mat-icon>
            </div>
            <h2 mat-dialog-title>{{ data.title }}</h2>
            <mat-dialog-content>
                <p>{{ data.message }}</p>
                <p class="warning-text">Cette action est irréversible.</p>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button (click)="onCancel()">
                    {{ data.cancelText }}
                </button>
                <button mat-raised-button color="warn" (click)="onConfirm()">
                    <mat-icon>delete</mat-icon>
                    {{ data.confirmText }}
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .delete-dialog {
            padding: 8px;
            
            .dialog-icon {
                text-align: center;
                margin-bottom: 16px;
                
                mat-icon {
                    font-size: 64px;
                    width: 64px;
                    height: 64px;
                    color: #ff9800;
                }
            }
            
            h2 {
                text-align: center;
                margin-bottom: 16px;
                font-size: 24px;
                font-weight: 600;
            }
            
            mat-dialog-content {
                text-align: center;
                
                p {
                    font-size: 16px;
                    color: #6c757d;
                    margin-bottom: 12px;
                }
                
                .warning-text {
                    color: #dc3545;
                    font-weight: 500;
                    font-size: 14px;
                }
            }
            
            mat-dialog-actions {
                padding-top: 16px;
                gap: 12px;
                
                button {
                    min-width: 120px;
                }
            }
        }
    `]
})
export class DeleteConfirmDialog {
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}

// ============================================
// DIALOG 2: PARTNERSHIP DETAILS
// ============================================
@Component({
    selector: 'partnership-details-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, MatChipsModule, CommonModule],
    template: `
        <div class="details-dialog">
            <div class="dialog-header">
                <img [src]="data.images?.[0] || 'assets/images/default.png'" 
                     [alt]="data.name" 
                     class="header-image" />
                <div class="header-overlay">
                    <mat-chip [color]="getStatusColor()" selected>
                        <mat-icon>{{ data.active ? 'check_circle' : 'cancel' }}</mat-icon>
                        {{ data.active ? 'Actif' : 'Inactif' }}
                    </mat-chip>
                </div>
            </div>
            
            <h2 mat-dialog-title>{{ data.name }}</h2>
            
            <mat-dialog-content>
                <div class="detail-section">
                    <div class="detail-item">
                        <mat-icon>category</mat-icon>
                        <div>
                            <span class="label">Type</span>
                            <span class="value">{{ data.type }}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <mat-icon>description</mat-icon>
                        <div>
                            <span class="label">Description</span>
                            <span class="value">{{ data.description || 'Non renseignée' }}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <mat-icon>attach_money</mat-icon>
                        <div>
                            <span class="label">Valeur du contrat</span>
                            <span class="value">{{ formatCurrency(data.contractValue) }}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-item">
                            <mat-icon>event</mat-icon>
                            <div>
                                <span class="label">Date de début</span>
                                <span class="value">{{ formatDate(data.startDate) }}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <mat-icon>event_available</mat-icon>
                            <div>
                                <span class="label">Date de fin</span>
                                <span class="value">{{ formatDate(data.endDate) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </mat-dialog-content>
            
            <mat-dialog-actions align="end">
                <button mat-button (click)="onClose()">Fermer</button>
                <button mat-raised-button color="primary" (click)="onEdit()">
                    <mat-icon>edit</mat-icon>
                    Modifier
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .details-dialog {
            .dialog-header {
                position: relative;
                width: calc(100% + 48px);
                height: 200px;
                margin: -24px -24px 24px;
                overflow: hidden;
                
                .header-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .header-overlay {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                }
            }
            
            h2 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 24px;
                color: #2c3e50;
            }
            
            .detail-section {
                display: flex;
                flex-direction: column;
                gap: 20px;
                
                .detail-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                
                .detail-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    
                    mat-icon {
                        color: #667eea;
                        font-size: 24px;
                        width: 24px;
                        height: 24px;
                    }
                    
                    div {
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                        flex: 1;
                        
                        .label {
                            font-size: 12px;
                            color: #6c757d;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            font-weight: 600;
                        }
                        
                        .value {
                            font-size: 16px;
                            color: #2c3e50;
                            font-weight: 500;
                            word-break: break-word;
                        }
                    }
                }
            }
            
            mat-dialog-actions {
                padding-top: 24px;
                gap: 12px;
                
                button {
                    min-width: 120px;
                }
            }
        }

        @media only screen and (max-width: 767px) {
            .details-dialog {
                .dialog-header {
                    height: 150px;
                }
                
                h2 {
                    font-size: 24px;
                }
                
                .detail-section {
                    .detail-row {
                        grid-template-columns: 1fr;
                    }
                }
            }
        }
    `]
})
export class PartnershipDetailsDialog {
    constructor(
        public dialogRef: MatDialogRef<PartnershipDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Partnership
    ) {}

    onClose(): void {
        this.dialogRef.close();
    }

    onEdit(): void {
        this.dialogRef.close({ action: 'edit', data: this.data });
    }

    getStatusColor(): string {
        return this.data.active ? 'primary' : 'warn';
    }

    formatDate(date: Date | string): string {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }
}

// ============================================
// DIALOG 3: ASSIGN EVENT
// ============================================
@Component({
    selector: 'assign-event-dialog',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatDialogModule, 
        MatIconModule, 
        MatSelectModule, 
        MatFormFieldModule, 
        CommonModule,
        FormsModule
    ],
    template: `
        <div class="assign-dialog">
            <h2 mat-dialog-title>
                <mat-icon>event</mat-icon>
                Assigner à un événement
            </h2>
            
            <mat-dialog-content>
                <p class="info-text">
                    Sélectionnez un événement pour assigner 
                    <strong>"{{ data.name }}"</strong>
                </p>
                
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Événement</mat-label>
                    <mat-select [(ngModel)]="selectedEventId">
                        <mat-option *ngFor="let event of events" [value]="event.id">
                            {{ event.name }}
                        </mat-option>
                    </mat-select>
                    <mat-icon matPrefix>event</mat-icon>
                </mat-form-field>
            </mat-dialog-content>
            
            <mat-dialog-actions align="end">
                <button mat-button (click)="onCancel()">Annuler</button>
                <button mat-raised-button color="primary" 
                        [disabled]="!selectedEventId"
                        (click)="onAssign()">
                    <mat-icon>check</mat-icon>
                    Assigner
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .assign-dialog {
            min-width: 400px;
            padding: 8px;
            
            h2 {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 24px;
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 16px;
                
                mat-icon {
                    color: #667eea;
                    font-size: 28px;
                    width: 28px;
                    height: 28px;
                }
            }
            
            mat-dialog-content {
                .info-text {
                    margin-bottom: 24px;
                    color: #6c757d;
                    font-size: 15px;
                    line-height: 1.6;
                    
                    strong {
                        color: #667eea;
                        font-weight: 600;
                    }
                }
                
                .full-width {
                    width: 100%;
                    
                    mat-icon {
                        color: #667eea;
                    }
                }
            }
            
            mat-dialog-actions {
                padding-top: 16px;
                gap: 12px;
                
                button {
                    min-width: 120px;
                }
            }
        }

        @media only screen and (max-width: 767px) {
            .assign-dialog {
                min-width: unset;
                width: 100%;
            }
        }
    `]
})
export class AssignEventDialog {
    selectedEventId: number | null = null;
    events: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<AssignEventDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Partnership
    ) {
        // Charger les événements
        // TODO: Remplacer par votre service réel
        this.events = [
            { id: 1, name: 'Conférence Tech 2025' },
            { id: 2, name: 'Salon Innovation' },
            { id: 3, name: 'Forum Entreprises' },
            { id: 4, name: 'Expo Digital' },
            { id: 5, name: 'Summit Marketing' }
        ];
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAssign(): void {
        if (this.selectedEventId) {
            this.dialogRef.close({ eventId: this.selectedEventId });
        }
    }
}