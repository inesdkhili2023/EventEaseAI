import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-drp-forms-integration',
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, FeathericonsModule],
    templateUrl: './drp-forms-integration.component.html',
    styleUrl: './drp-forms-integration.component.scss'
})
export class DrpFormsIntegrationComponent {

    // Date Range Picker Forms Integration
    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

}