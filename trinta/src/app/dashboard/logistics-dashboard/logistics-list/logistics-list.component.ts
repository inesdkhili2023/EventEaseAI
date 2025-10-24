import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LogisticsNeed, NeedStatus } from '../../../models/logistics-need.model';
import { LogisticsNeedService } from '../../../services/logistics-need.service';

@Component({
    selector: 'app-logistics-list',
    standalone: true,
    imports: [
        CommonModule,
        NgClass,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule
    ],
    template: `
        <div class="container-fluid">
            <div class="card mb-30">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3>Liste des Besoins Logistiques</h3>
                    <button mat-raised-button color="primary" routerLink="/logistics-dashboard">
                        <i class="bx bx-plus"></i> Nouveau Besoin
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle">
                            <thead>
                                <tr>
                                    <th>ID Event</th>
                                    <th>Type</th>
                                    <th>Article</th>
                                    <th>Quantité</th>
                                    <th>Statut</th>
                                    <th>Date Création</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let need of logisticsNeeds">
                                    <td>{{need.eventId}}</td>
                                    <td>{{need.type}}</td>
                                    <td>{{need.itemName}}</td>
                                    <td>{{need.quantity}} {{need.unit}}</td>
                                    <td>
                                        <span class="badge" [ngClass]="{
                                            'bg-warning': need.status === 'PLANNED',
                                            'bg-info': need.status === 'CONFIRMED',
                                            'bg-success': need.status === 'ACQUIRED'
                                        }">{{need.status}}</span>
                                    </td>
                                    <td>{{need.createdAt | date:'short'}}</td>
                                    <td>
                                        <button mat-icon-button color="primary" (click)="updateStatus(need)">
                                            <i class="bx bx-check-circle"></i>
                                        </button>
                                        <button mat-icon-button color="warn" (click)="deleteNeed(need.id)">
                                            <i class="bx bx-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .badge {
            padding: 8px 12px;
            border-radius: 4px;
            color: white;
        }
        .bg-warning {
            background-color: var(--warningColor);
        }
        .bg-info {
            background-color: var(--infoColor);
        }
        .bg-success {
            background-color: var(--successColor);
        }
    `]
})
export class LogisticsListComponent {
    logisticsNeeds: LogisticsNeed[] = [];

    constructor(private logisticsService: LogisticsNeedService) {
        this.loadLogisticsNeeds();
    }

    loadLogisticsNeeds() {
        this.logisticsService.getAllLogisticsNeeds().subscribe(needs => {
            this.logisticsNeeds = needs;
        });
    }

    updateStatus(need: LogisticsNeed) {
        const nextStatus = this.getNextStatus(need.status);
        const updatedNeed = { ...need, status: nextStatus };
        
        this.logisticsService.updateLogisticsNeed(need.id!, updatedNeed).subscribe({
            next: () => this.loadLogisticsNeeds(),
            error: (error) => console.error('Error updating status:', error)
        });
    }

    deleteNeed(id: number | undefined) {
        if (!id) return;
        
        if (confirm('Êtes-vous sûr de vouloir supprimer ce besoin logistique ?')) {
            this.logisticsService.deleteLogisticsNeed(id).subscribe({
                next: () => this.loadLogisticsNeeds(),
                error: (error) => console.error('Error deleting need:', error)
            });
        }
    }

    private getNextStatus(currentStatus: NeedStatus): NeedStatus {
        switch (currentStatus) {
            case NeedStatus.PLANNED:
                return NeedStatus.CONFIRMED;
            case NeedStatus.CONFIRMED:
                return NeedStatus.ACQUIRED;
            default:
                return NeedStatus.PLANNED;
        }
    }
}