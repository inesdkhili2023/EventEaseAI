import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-dpw-custom-icon',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MatCardModule, FeathericonsModule],
    templateUrl: './dpw-custom-icon.component.html',
    styleUrl: './dpw-custom-icon.component.scss'
})
export class DpwCustomIconComponent {}