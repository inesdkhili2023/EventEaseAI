import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-dp-selected-value',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatCardModule,
        FeathericonsModule
    ],
    templateUrl: './dp-selected-value.component.html',
    styleUrl: './dp-selected-value.component.scss'
})
export class DpSelectedValueComponent {

    // Datepicker Selected Value
    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());

}