import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DriverAvailability, DriverAvailabilityService } from '../../../services/driver-availability.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"; // ← AJOUT IMPORTANT
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-working-schedule-driver',
    standalone: true,
    imports: [
        RouterLink, 
        MatCardModule, 
        MatButtonModule, 
        MatMenuModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatFormFieldModule,
        MatInputModule, // ← AJOUT IMPORTANT
        CommonModule,
        FormsModule
    ],
    templateUrl: './working-schedule-driver.component.html',
    styleUrl: './working-schedule-driver.component.scss'
})
export class WorkingScheduleDriverComponent {

    newAvailability: DriverAvailability = {
        date: '',
        startTime: '',
        endTime: '',
        available: true
    };

    constructor(
        private availabilityService: DriverAvailabilityService,
        private snackBar: MatSnackBar
    ) {}

    addAvailability() {
        const driverId = localStorage.getItem('driverId'); // ou récupéré via email
        if (!driverId) {
            this.snackBar.open('❌ ID chauffeur non trouvé', 'Fermer', { duration: 3000 });
            return;
        }

        // Validation basique
        if (!this.newAvailability.date || !this.newAvailability.startTime || !this.newAvailability.endTime) {
            this.snackBar.open('❌ Veuillez remplir tous les champs', 'Fermer', { duration: 3000 });
            return;
        }

        const availabilityData = {
            driverId: driverId,
            date: this.newAvailability.date,
            startTime: this.newAvailability.startTime,
            endTime: this.newAvailability.endTime,
            isAvailable: this.newAvailability.available
        };

        this.availabilityService.addAvailability(availabilityData).subscribe({
            next: () => {
                this.snackBar.open('✅ Disponibilité ajoutée !', 'Fermer', { duration: 3000 });
                this.newAvailability = { date: '', startTime: '', endTime: '', available: true };
            },
            error: (error) => {
                console.error('Erreur ajout disponibilité:', error);
                this.snackBar.open('❌ Erreur lors de l\'ajout', 'Fermer', { duration: 3000 });
            }
        });
    }
}