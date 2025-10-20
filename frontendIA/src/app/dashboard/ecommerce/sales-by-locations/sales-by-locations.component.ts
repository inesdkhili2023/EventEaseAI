import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sales-by-locations',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink],
    templateUrl: './sales-by-locations.component.html',
    styleUrl: './sales-by-locations.component.scss'
})
export class SalesByLocationsComponent {}