import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-invoices-page',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './invoices-page.component.html',
    styleUrl: './invoices-page.component.scss'
})
export class InvoicesPageComponent {}