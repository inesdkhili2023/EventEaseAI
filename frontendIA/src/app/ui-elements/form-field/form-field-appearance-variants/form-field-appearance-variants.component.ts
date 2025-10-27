import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-form-field-appearance-variants',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, FeathericonsModule],
    templateUrl: './form-field-appearance-variants.component.html',
    styleUrl: './form-field-appearance-variants.component.scss'
})
export class FormFieldAppearanceVariantsComponent {}