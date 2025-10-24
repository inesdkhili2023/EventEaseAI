import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-avatars',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './avatars.component.html',
    styleUrl: './avatars.component.scss'
})
export class AvatarsComponent {}