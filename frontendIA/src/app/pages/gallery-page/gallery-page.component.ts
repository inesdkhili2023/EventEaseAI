import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-gallery-page',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './gallery-page.component.html',
    styleUrl: './gallery-page.component.scss'
})
export class GalleryPageComponent {}