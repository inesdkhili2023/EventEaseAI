import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-dpw-min-max-validation',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, FeathericonsModule],
    templateUrl: './dpw-min-max-validation.component.html',
    styleUrl: './dpw-min-max-validation.component.scss'
})
export class DpwMinMaxValidationComponent {

    // Datepicker with Min & Max Validation
    minDate: Date;
    maxDate: Date;
    constructor() {
        // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 20, 0, 1);
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }

}