import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-divider',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatListModule, MatDividerModule],
    templateUrl: './divider.component.html',
    styleUrl: './divider.component.scss'
})
export class DividerComponent {}