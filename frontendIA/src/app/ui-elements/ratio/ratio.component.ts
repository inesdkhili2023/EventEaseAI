import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ratio',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './ratio.component.html',
    styleUrl: './ratio.component.scss'
})
export class RatioComponent {}