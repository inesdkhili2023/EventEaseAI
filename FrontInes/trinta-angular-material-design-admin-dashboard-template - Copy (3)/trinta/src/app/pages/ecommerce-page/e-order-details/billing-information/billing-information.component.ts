import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-billing-information',
    standalone: true,
    imports: [MatCardModule, RouterLink],
    templateUrl: './billing-information.component.html',
    styleUrl: './billing-information.component.scss'
})
export class BillingInformationComponent {}