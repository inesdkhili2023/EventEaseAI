import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-shipping-information',
    standalone: true,
    imports: [MatCardModule, RouterLink],
    templateUrl: './shipping-information.component.html',
    styleUrl: './shipping-information.component.scss'
})
export class ShippingInformationComponent {}