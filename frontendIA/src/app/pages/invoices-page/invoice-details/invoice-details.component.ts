import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-invoice-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './invoice-details.component.html',
    styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent {}