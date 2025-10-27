import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnershipService, Partnership } from '../../../services/partnership.service';
import { EventService, Event } from '../../../services/event.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// ============================================
// FILTER PIPE
// ============================================
@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: any): any[] {
        if (!items || !field) {
            return items;
        }
        return items.filter(item => item[field] === value);
    }
}

// ============================================
// MAIN COMPONENT
// ============================================
@Component({
    selector: 'app-e-sellers',
    standalone: true,
    providers: [PartnershipService,EventService],
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
        MatTooltipModule,
        CommonModule,
        FilterPipe,
        HttpClientModule
    ],
    templateUrl: './e-sellers.component.html',
    styleUrls: ['./e-sellers.component.scss']
})
export class ESellersComponent implements OnInit {
    partnerships: Partnership[] = [];
    isLoading = false;
    selectedPartnership: Partnership | null = null;
    private backendUrl = 'http://localhost:8081'; // ✅ URL du backend

    constructor(
        private partnershipService: PartnershipService,
        private eventService: EventService,
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
                // ✅ Mapper les données pour convertir image_url en imageUrl
                this.partnerships = data.map(p => ({
                    ...p,
                    imageUrl: (p as any).image_url || p.imageUrl || null
                }));
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
        this.router.navigate(['/ecommerce-page/create-product']);
    }

    onEdit(partnership: Partnership): void {
        const dialogRef = this.dialog.open(EditPartnershipDialog, {
            width: '800px',
            maxHeight: '90vh',
            data: partnership
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.partnershipService.update(partnership.id!, result).subscribe({
                    next: () => {
                        this.showMessage('Partenariat modifié avec succès', 'success');
                        this.loadPartnerships();
                    },
                    error: (error) => {
                        console.error('Error updating partnership:', error);
                        this.showMessage('Erreur lors de la modification', 'error');
                    }
                });
            }
        });
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
            width: '700px',
            maxHeight: '90vh',
            data: { 
                partnership: partnership,
                eventService: this.eventService,
                partnershipService: this.partnershipService
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result?.success) {
                this.showMessage('Partenariat assigné avec succès', 'success');
                this.loadPartnerships();
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
            
    getActivePartnerships(): number {
        return this.partnerships.filter(p => p.active).length;
    }

    getInactivePartnerships(): number {
        return this.partnerships.filter(p => !p.active).length;
    }

    // ✅ Nouvelle méthode utilitaire pour obtenir l'URL de l'image
    getImageUrl(partnership: Partnership): string {
        // Vérifier d'abord si l'objet a image_url (snake_case du backend)
        const backendUrl = (partnership as any).image_url;
        if (backendUrl && typeof backendUrl === 'string') {
            // Si l'URL commence par /uploads, ajouter le baseUrl
            if (backendUrl.startsWith('/uploads')) {
                return this.backendUrl + backendUrl;
            }
            return backendUrl;
        }
        
        // Si imageUrl est une chaîne directement
        if (partnership.imageUrl && typeof partnership.imageUrl === 'string') {
            if (partnership.imageUrl.startsWith('/uploads')) {
                return this.backendUrl + partnership.imageUrl;
            }
            return partnership.imageUrl;
        }
        
        // Si images est un tableau
        if (partnership.images && partnership.images.length > 0) {
            const imgUrl = partnership.images[0];
            if (imgUrl.startsWith('/uploads')) {
                return this.backendUrl + imgUrl;
            }
            return imgUrl;
        }
        
        // Image par défaut si aucune image n'est disponible
        return 'https://via.placeholder.com/400x200/667eea/ffffff?text=No+Image';
    }
    onImageError(event: any): void {
        if (event.target) {
            event.target.src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=No+Image';
        }
    }
}


// ============================================
// DIALOG 1: DELETE CONFIRMATION
// ============================================
@Component({
    selector: 'delete-confirm-dialog',
    providers: [PartnershipService,EventService],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule,HttpClientModule],
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
                <button mat-button (click)="onCancel()">{{ data.cancelText }}</button>
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
// DIALOG 2: EDIT PARTNERSHIP
// ============================================
@Component({
    selector: 'edit-partnership-dialog',
    providers: [PartnershipService,EventService],
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    template: `
        <div class="edit-dialog">
            <h2 mat-dialog-title>
                <mat-icon>edit</mat-icon>
                Modifier le Partenariat
            </h2>
            
            <mat-dialog-content>
                <form [formGroup]="partnershipForm">
                    <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>Nom du Partenariat</mat-label>
                            <input matInput formControlName="name" />
                            <mat-icon matPrefix>business</mat-icon>
                            <mat-error *ngIf="partnershipForm.get('name')?.hasError('required')">
                                Le nom est requis
                            </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>Type</mat-label>
                            <mat-select formControlName="type">
                                <mat-option value="Sponsor">Sponsor</mat-option>
                                <mat-option value="Partenaire Commercial">Partenaire Commercial</mat-option>
                                <mat-option value="Fournisseur">Fournisseur</mat-option>
                                <mat-option value="Media">Media</mat-option>
                            </mat-select>
                            <mat-icon matPrefix>category</mat-icon>
                        </mat-form-field>
                    </div>

                    <mat-form-field appearance="outline" class="form-field-full">
                        <mat-label>Description</mat-label>
                        <textarea matInput formControlName="description" rows="3"></textarea>
                        <mat-icon matPrefix>description</mat-icon>
                    </mat-form-field>

                    <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>Valeur du Contrat ($)</mat-label>
                            <input matInput type="number" formControlName="contractValue" />
                            <mat-icon matPrefix>attach_money</mat-icon>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>URL de l'Image</mat-label>
                            <input matInput formControlName="imageUrl" />
                            <mat-icon matPrefix>image</mat-icon>
                        </mat-form-field>
                    </div>

                    <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>Date de Début</mat-label>
                            <input matInput [matDatepicker]="startPicker" formControlName="startDate" />
                            <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                            <mat-datepicker #startPicker></mat-datepicker>
                            <mat-icon matPrefix>event</mat-icon>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                            <mat-label>Date de Fin</mat-label>
                            <input matInput [matDatepicker]="endPicker" formControlName="endDate" />
                            <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                            <mat-datepicker #endPicker></mat-datepicker>
                            <mat-icon matPrefix>event</mat-icon>
                        </mat-form-field>
                    </div>

                    <mat-checkbox formControlName="active" color="primary">
                        Partenariat Actif
                    </mat-checkbox>
                </form>
            </mat-dialog-content>
            
            <mat-dialog-actions align="end">
                <button mat-button (click)="onCancel()">Annuler</button>
                <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!partnershipForm.valid">
                    <mat-icon>save</mat-icon>
                    Enregistrer
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .edit-dialog {
            min-width: 600px;
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
                }
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .form-field, .form-field-full {
                width: 100%;
            }
            
            .form-field-full {
                margin-bottom: 16px;
            }
            
            mat-checkbox {
                margin: 16px 0;
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
            .edit-dialog {
                min-width: unset;
                .form-row {
                    grid-template-columns: 1fr;
                }
            }
        }
    `]
})
export class EditPartnershipDialog {
    partnershipForm: FormGroup;
    private backendUrl = 'http://localhost:8081'; // ✅ URL du backend

    constructor(
        public dialogRef: MatDialogRef<EditPartnershipDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Partnership,
        private fb: FormBuilder
    ) {
        // ✅ Correction : gérer imageUrl ou images
        const imageUrlValue = this.getImageUrl(data);
        
        this.partnershipForm = this.fb.group({
            name: [data.name, Validators.required],
            type: [data.type, Validators.required],
            description: [data.description],
            contractValue: [data.contractValue, [Validators.required, Validators.min(0)]],
            startDate: [new Date(data.startDate), Validators.required],
            endDate: [new Date(data.endDate), Validators.required],
            imageUrl: [imageUrlValue],
            active: [data.active]
        });
    }

    // ✅ Méthode utilitaire pour obtenir l'URL de l'image
    getImageUrl(partnership: Partnership): string {
        // Vérifier d'abord si l'objet a image_url (snake_case du backend)
        const backendUrl = (partnership as any).image_url;
        if (backendUrl && typeof backendUrl === 'string') {
            if (backendUrl.startsWith('/uploads')) {
                return this.backendUrl + backendUrl;
            }
            return backendUrl;
        }
        
        if (partnership.imageUrl && typeof partnership.imageUrl === 'string') {
            if (partnership.imageUrl.startsWith('/uploads')) {
                return this.backendUrl + partnership.imageUrl;
            }
            return partnership.imageUrl;
        }
        if (partnership.images && partnership.images.length > 0) {
            const imgUrl = partnership.images[0];
            if (imgUrl.startsWith('/uploads')) {
                return this.backendUrl + imgUrl;
            }
            return imgUrl;
        }
        return 'https://via.placeholder.com/400x200/667eea/ffffff?text=No+Image';
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.partnershipForm.valid) {
            const formValue = this.partnershipForm.value;
            const partnership: Partnership = {
                name: formValue.name,
                type: formValue.type,
                description: formValue.description,
                contractValue: formValue.contractValue,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                active: formValue.active,
                imageUrl: formValue.imageUrl || ''
            };
            this.dialogRef.close(partnership);
        }
    }
}

// ============================================
// DIALOG 3: PARTNERSHIP DETAILS
// ============================================
@Component({
    selector: 'partnership-details-dialog',
    providers: [PartnershipService,EventService],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, MatChipsModule, CommonModule,HttpClientModule],
    template: `
        <div class="details-dialog">
            <div class="dialog-header">
                <img [src]="getImageUrl()" 
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
    private backendUrl = 'http://localhost:8081'; // ✅ URL du backend

    constructor(
        public dialogRef: MatDialogRef<PartnershipDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Partnership
    ) {}

    // ✅ Méthode pour obtenir l'URL de l'image
    getImageUrl(): string {
        // Vérifier d'abord si l'objet a image_url (snake_case du backend)
        const backendUrl = (this.data as any).image_url;
        if (backendUrl && typeof backendUrl === 'string') {
            if (backendUrl.startsWith('/uploads')) {
                return this.backendUrl + backendUrl;
            }
            return backendUrl;
        }
        
        if (this.data.imageUrl && typeof this.data.imageUrl === 'string') {
            if (this.data.imageUrl.startsWith('/uploads')) {
                return this.backendUrl + this.data.imageUrl;
            }
            return this.data.imageUrl;
        }
        if (this.data.images && this.data.images.length > 0) {
            const imgUrl = this.data.images[0];
            if (imgUrl.startsWith('/uploads')) {
                return this.backendUrl + imgUrl;
            }
            return imgUrl;
        }
        return 'https://via.placeholder.com/700x200/667eea/ffffff?text=No+Image';
    }

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
// DIALOG 4: ASSIGN EVENT WITH AI RECOMMENDATIONS
// ============================================
@Component({
    selector: 'assign-event-dialog',
    providers: [PartnershipService,EventService],
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTooltipModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    template: `
        <div class="assign-dialog">
            <h2 mat-dialog-title>
                <mat-icon>event</mat-icon>
                Assigner "{{ data.partnership.name }}" à un événement
            </h2>
            
            <mat-dialog-content>
                <mat-tab-group>
                    <!-- TAB 1: Tous les événements -->
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon>list</mat-icon>
                            Tous les événements
                        </ng-template>
                        
                        <div class="tab-content">
                            
                            <div *ngIf="loadingEvents" class="loading-container">
                                <mat-spinner diameter="40"></mat-spinner>
                                <p>Chargement des événements...</p>
                            </div>

                            <div class="event-list" *ngIf="!loadingEvents && allEvents.length > 0">
                                <div class="event-card" 
                                     *ngFor="let event of allEvents"
                                     [class.selected]="selectedEventId === event.id"
                                     (click)="selectedEventId = event.id">
                                    <mat-icon>{{ selectedEventId === event.id ? 'radio_button_checked' : 'radio_button_unchecked' }}</mat-icon>
                                    <div class="event-info">
                                        <h4>{{ event.name }}</h4>
                                        <p *ngIf="event.description">{{ event.description }}</p>
                                        <div class="event-meta">
                                            <span *ngIf="event.date">
                                                <mat-icon>calendar_today</mat-icon>
                                                {{ formatDate(event.date) }}
                                            </span>
                                            <span *ngIf="event.location">
                                                <mat-icon>place</mat-icon>
                                                {{ event.location }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </mat-tab>
                    
                    <!-- TAB 2: Recommandations AI -->
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon>psychology</mat-icon>
                            Recommandations IA
                        </ng-template>
                        
                        
                            
                            <button mat-raised-button color="accent" 
                                    class="load-recommendations-btn"
                                    (click)="loadRecommendations()"
                                    [disabled]="loadingRecommendations">
                                <mat-icon>auto_awesome</mat-icon>
                                {{ loadingRecommendations ? 'Analyse en cours...' : 'Obtenir les recommandations' }}
                            </button>
                            
                            <div *ngIf="loadingRecommendations" class="loading-container">
                                <mat-spinner diameter="40"></mat-spinner>
                                <p>Analyse des événements avec IA...</p>
                            </div>
                            
                            <div class="recommendations-list" *ngIf="!loadingRecommendations && recommendedEvents.length > 0">
                                <div class="event-card recommended" 
                                     *ngFor="let event of recommendedEvents; let i = index"
                                     [class.selected]="selectedEventId === event.id"
                                     (click)="selectedEventId = event.id">
                                    <div class="recommendation-badge">
                                        <mat-chip color="accent" selected>
                                            <mat-icon>stars</mat-icon>
                                            Top {{ i + 1 }}
                                        </mat-chip>
                                        <span class="match-score" *ngIf="event.matchScore">
                                            {{ event.matchScore }}% de correspondance
                                        </span>
                                    </div>
                                    
                                    <mat-icon class="select-icon">
                                        {{ selectedEventId === event.id ? 'radio_button_checked' : 'radio_button_unchecked' }}
                                    </mat-icon>
                                    
                                    <div class="event-info">
                                        <h4>{{ event.name }}</h4>
                                        <p *ngIf="event.description">{{ event.description }}</p>
                                        
                                        <div class="recommendation-reasons" *ngIf="event.reasons && event.reasons.length > 0">
                                            <span class="reasons-title">Pourquoi cette recommandation :</span>
                                            <div class="reason-chips">
                                                <mat-chip *ngFor="let reason of event.reasons">
                                                    <mat-icon>check_circle</mat-icon>
                                                    {{ reason }}
                                                </mat-chip>
                                            </div>
                                        </div>
                                        
                                        <div class="event-meta">
                                            <span *ngIf="event.date">
                                                <mat-icon>calendar_today</mat-icon>
                                                {{ formatDate(event.date) }}
                                            </span>
                                            <span *ngIf="event.location">
                                                <mat-icon>place</mat-icon>
                                                {{ event.location }}
                                            </span>
                                            <span *ngIf="event.type">
                                                <mat-icon>category</mat-icon>
                                                {{ event.type }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="no-recommendations" *ngIf="!loadingRecommendations && recommendedEvents.length === 0 && recommendationsLoaded">
                                <mat-icon>info</mat-icon>
                                <p>Aucune recommandation disponible pour ce partenariat</p>
                            </div>
                    </mat-tab>
                </mat-tab-group>
            </mat-dialog-content>
            
            <mat-dialog-actions align="end">
                <button mat-button (click)="onCancel()">Annuler</button>
                <button mat-raised-button color="primary" 
                        [disabled]="!selectedEventId || assigning"
                        (click)="onAssign()">
                    <mat-icon>{{ assigning ? 'hourglass_empty' : 'check' }}</mat-icon>
                    {{ assigning ? 'Assignation...' : 'Assigner' }}
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .assign-dialog {
            min-width: 650px;
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
                min-height: 400px;
                max-height: 600px;
                overflow-y: auto;
            }
            
            .tab-content {
                padding: 20px 0;
            }
            
            .info-text {
                margin-bottom: 20px;
                color: #6c757d;
                font-size: 15px;
            }
            
            .full-width {
                width: 100%;
                margin-bottom: 20px;
            }
            
            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                
                p {
                    margin-top: 16px;
                    color: #6c757d;
                }
            }
            
            // AI Header
            .ai-header {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                color: white;
                margin-bottom: 20px;
                
                .ai-icon {
                    font-size: 48px;
                    width: 48px;
                    height: 48px;
                }
                
                h3 {
                    margin: 0 0 4px;
                    font-size: 20px;
                    font-weight: 600;
                }
                
                p {
                    margin: 0;
                    font-size: 14px;
                    opacity: 0.9;
                }
            }
            
            .load-recommendations-btn {
                width: 100%;
                height: 48px;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: 600;
                
                mat-icon {
                    margin-right: 8px;
                }
            }
            
            // Event Cards
            .event-list, .recommendations-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .event-card {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px;
                border: 2px solid #e9ecef;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                
                &:hover {
                    border-color: #667eea;
                    background: #f8f9fa;
                }
                
                &.selected {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.05);
                }
                
                &.recommended {
                    border-color: #ff6b6b;
                    position: relative;
                    
                    &:hover {
                        border-color: #ff6b6b;
                        background: rgba(255, 107, 107, 0.05);
                    }
                    
                    &.selected {
                        border-color: #ff6b6b;
                        background: rgba(255, 107, 107, 0.1);
                    }
                }
                
                > mat-icon, .select-icon {
                    color: #667eea;
                    font-size: 24px;
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                }
                
                .event-info {
                    flex: 1;
                    
                    h4 {
                        margin: 0 0 8px;
                        font-size: 16px;
                        font-weight: 600;
                        color: #2c3e50;
                    }
                    
                    p {
                        margin: 0 0 12px;
                        font-size: 14px;
                        color: #6c757d;
                        line-height: 1.5;
                    }
                    
                    .event-meta {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 16px;
                        
                        span {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 13px;
                            color: #6c757d;
                            
                            mat-icon {
                                font-size: 16px;
                                width: 16px;
                                height: 16px;
                            }
                        }
                    }
                }
            }
            
            .recommendation-badge {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
                
                mat-chip {
                    font-weight: 600;
                    
                    mat-icon {
                        margin-right: 4px;
                    }
                }
                
                .match-score {
                    font-size: 13px;
                    color: #ff6b6b;
                    font-weight: 600;
                }
            }
            
            .recommendation-reasons {
                margin: 12px 0;
                padding: 12px;
                background: #f8f9fa;
                border-radius: 8px;
                
                .reasons-title {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #6c757d;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .reason-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    
                    mat-chip {
                        font-size: 12px;
                        
                        mat-icon {
                            font-size: 14px;
                            width: 14px;
                            height: 14px;
                            margin-right: 4px;
                        }
                    }
                }
            }
            
            .event-option {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                
                .event-name {
                    font-weight: 500;
                }
                
                .event-type {
                    font-size: 12px;
                    color: #6c757d;
                    background: #f8f9fa;
                    padding: 2px 8px;
                    border-radius: 4px;
                }
            }
            
            .no-recommendations {
                text-align: center;
                padding: 40px 20px;
                color: #6c757d;
                
                mat-icon {
                    font-size: 64px;
                    width: 64px;
                    height: 64px;
                    margin-bottom: 16px;
                    color: #cbd5e0;
                }
                
                p {
                    margin: 0;
                    font-size: 16px;
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
                
                .event-card {
                    flex-direction: column;
                }
                
                .recommendation-badge {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }
            }
        }
    `]
})
export class AssignEventDialog implements OnInit {
    selectedEventId: number | null = null;
    allEvents: any[] = [];
    recommendedEvents: any[] = [];
    loadingEvents = false;
    loadingRecommendations = false;
    recommendationsLoaded = false;
    assigning = false;

    constructor(
        public dialogRef: MatDialogRef<AssignEventDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.loadAllEvents();
    }

    loadAllEvents(): void {
        this.loadingEvents = true;
        this.data.eventService.getAll().subscribe({
            next: (events: Event[]) => {
                this.allEvents = events;
                this.loadingEvents = false;
            },
            error: (error: any) => {
                console.error('Error loading events:', error);
                this.loadingEvents = false;
            }
        });
    }

    loadRecommendations(): void {
        this.loadingRecommendations = true;
        this.recommendationsLoaded = false;
        
        this.data.partnershipService.getRecommendedEvents(this.data.partnership.id).subscribe({
            next: (events: any[]) => {
                this.recommendedEvents = events;
                this.loadingRecommendations = false;
                this.recommendationsLoaded = true;
            },
            error: (error: any) => {
                console.error('Error loading recommendations:', error);
                this.loadingRecommendations = false;
                this.recommendationsLoaded = true;
                this.recommendedEvents = [];
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAssign(): void {
        if (this.selectedEventId) {
            this.assigning = true;
            
            this.data.partnershipService.assignToEvent(this.data.partnership.id, this.selectedEventId).subscribe({
                next: () => {
                    this.assigning = false;
                    this.dialogRef.close({ success: true });
                },
                error: (error: any) => {
                    console.error('Error assigning event:', error);
                    this.assigning = false;
                    this.dialogRef.close({ success: false, error: error });
                }
            });
        }
    }

    formatDate(date: Date | string): string {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

}