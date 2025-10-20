import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-delivery-info',
    standalone: true,
    imports: [MatCardModule, RouterLink],
    templateUrl: './delivery-info.component.html',
    styleUrl: './delivery-info.component.scss'
})
export class DeliveryInfoComponent {}