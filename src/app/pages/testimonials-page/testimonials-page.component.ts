import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-testimonials-page',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './testimonials-page.component.html',
    styleUrl: './testimonials-page.component.scss'
})
export class TestimonialsPageComponent {}