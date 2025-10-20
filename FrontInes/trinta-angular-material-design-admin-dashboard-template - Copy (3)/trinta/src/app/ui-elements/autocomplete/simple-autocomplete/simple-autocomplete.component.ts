import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-simple-autocomplete',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, MatCardModule, FeathericonsModule],
    templateUrl: './simple-autocomplete.component.html',
    styleUrl: './simple-autocomplete.component.scss'
})
export class SimpleAutocompleteComponent {

    // Form Control
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];

}