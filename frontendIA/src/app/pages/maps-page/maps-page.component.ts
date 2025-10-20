import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-maps-page',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './maps-page.component.html',
    styleUrl: './maps-page.component.scss'
})
export class MapsPageComponent {}