import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-utilities',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './utilities.component.html',
    styleUrl: './utilities.component.scss'
})
export class UtilitiesComponent {}