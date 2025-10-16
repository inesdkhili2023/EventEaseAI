import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-dpw-filter-validation',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, FeathericonsModule],
    templateUrl: './dpw-filter-validation.component.html',
    styleUrl: './dpw-filter-validation.component.scss'
})
export class DpwFilterValidationComponent {

    // Datepicker with Filter Validation
    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    };

}