import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LogisticsNeed, NeedStatus, NeedType } from '../../models/logistics-need.model';
import { LogisticsNeedService } from '../../services/logistics-need.service';

@Component({
    selector: 'app-logistics-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        RouterModule
    ],
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card mb-30">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h3>Besoins Logistiques</h3>
                            <button mat-raised-button color="primary" routerLink="/logistics-dashboard/list">
                                <i class="bx bx-list-ul"></i> Voir la Liste
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="overview-content">
                                <div class="row justify-content-center">
                                    <div class="col-sm-4">
                                        <div class="overview-box bg-primary">
                                            <div class="icon">
                                                <i class="bx bx-package"></i>
                                            </div>
                                            <h3>{{totalNeeds}}</h3>
                                            <p class="mb-0">Total Besoins</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="overview-box bg-success">
                                            <div class="icon">
                                                <i class="bx bx-check-circle"></i>
                                            </div>
                                            <h3>{{acquiredNeeds}}</h3>
                                            <p class="mb-0">Besoins Acquis</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="overview-box bg-warning">
                                            <div class="icon">
                                                <i class="bx bx-time"></i>
                                            </div>
                                            <h3>{{pendingNeeds}}</h3>
                                            <p class="mb-0">Besoins en Attente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <!-- Quick Add Form -->
            <div class="card mb-30">
                <div class="card-header">
                    <h3>Ajouter un Besoin</h3>
                </div>
                <div class="card-body">
                    <form (ngSubmit)="onSubmit()" #quickForm="ngForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <mat-form-field appearance="outline" class="w-100">
                                    <mat-label>ID Événement</mat-label>
                                    <input matInput type="number" name="eventId" [(ngModel)]="newNeed.eventId" required>
                                </mat-form-field>
                            </div>
                            <div class="col-md-6 mb-3">
                                <mat-form-field appearance="outline" class="w-100">
                                    <mat-label>Type</mat-label>
                                    <mat-select name="type" [(ngModel)]="newNeed.type" required>
                                        <mat-option *ngFor="let type of needTypes" [value]="type">
                                            {{type}}
                                        </mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <mat-form-field appearance="outline" class="w-100">
                                    <mat-label>Article</mat-label>
                                    <input matInput name="itemName" [(ngModel)]="newNeed.itemName" required>
                                </mat-form-field>
                            </div>
                            <div class="col-md-3 mb-3">
                                <mat-form-field appearance="outline" class="w-100">
                                    <mat-label>Quantité</mat-label>
                                    <input matInput type="number" name="quantity" [(ngModel)]="newNeed.quantity" required>
                                </mat-form-field>
                            </div>
                            <div class="col-md-3 mb-3">
                                <mat-form-field appearance="outline" class="w-100">
                                    <mat-label>Unité</mat-label>
                                    <input matInput name="unit" [(ngModel)]="newNeed.unit" required>
                                </mat-form-field>
                            </div>
                        </div>
                        <button mat-raised-button color="primary" type="submit" [disabled]="!quickForm.form.valid">
                            Ajouter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .overview-box {
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            color: white;
            margin-bottom: 20px;
        }
        .overview-box .icon {
            font-size: 40px;
            margin-bottom: 10px;
        }
        .overview-box h3 {
            font-size: 24px;
            margin-bottom: 5px;
            color: white;
        }
        .overview-box p {
            font-size: 16px;
        }
        .badge {
            padding: 8px 12px;
        }
    `]
})
export class LogisticsDashboardComponent {
    totalNeeds = 0;
    acquiredNeeds = 0;
    pendingNeeds = 0;
    recentNeeds: LogisticsNeed[] = [];
    needTypes = Object.values(NeedType);
    
    newNeed: LogisticsNeed = {
        eventId: 0,
        type: NeedType.MATERIAL,
        itemName: '',
        quantity: 0,
        unit: '',
        status: NeedStatus.PLANNED
    };

    constructor(private logisticsService: LogisticsNeedService) {
        this.loadDashboardData();
    }

    loadDashboardData() {
        this.logisticsService.getAllLogisticsNeeds().subscribe(needs => {
            this.recentNeeds = needs.slice(0, 5); // Derniers 5 besoins
            this.totalNeeds = needs.length;
            this.acquiredNeeds = needs.filter(n => n.status === NeedStatus.ACQUIRED).length;
            this.pendingNeeds = needs.filter(n => n.status !== NeedStatus.ACQUIRED).length;
        });
    }

    onSubmit() {
        this.logisticsService.createLogisticsNeed(this.newNeed).subscribe({
            next: () => {
                this.loadDashboardData();
                this.newNeed = {
                    eventId: 0,
                    type: NeedType.MATERIAL,
                    itemName: '',
                    quantity: 0,
                    unit: '',
                    status: NeedStatus.PLANNED
                };
            },
            error: (error) => {
                console.error('Error creating logistics need:', error);
            }
        });
    }
}