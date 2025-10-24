import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-photos',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './photos.component.html',
    styleUrl: './photos.component.scss'
})
export class PhotosComponent {}