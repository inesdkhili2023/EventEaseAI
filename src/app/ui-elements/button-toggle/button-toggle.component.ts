import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-button-toggle',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonToggleModule, MatIconModule, FormsModule, ReactiveFormsModule],
    templateUrl: './button-toggle.component.html',
    styleUrl: './button-toggle.component.scss'
})
export class ButtonToggleComponent {

    // Button Toggle with Forms
    fontStyleControl = new FormControl('');
    fontStyle?: string;

}