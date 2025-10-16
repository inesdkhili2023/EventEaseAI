import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-e-sellers',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './e-sellers.component.html',
    styleUrl: './e-sellers.component.scss'
})
export class ESellersComponent {}