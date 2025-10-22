import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-ecommerce-page',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './ecommerce-page.component.html',
    styleUrl: './ecommerce-page.component.scss'
})
export class EcommercePageComponent {}