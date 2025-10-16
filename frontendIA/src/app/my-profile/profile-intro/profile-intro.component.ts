import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-intro',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './profile-intro.component.html',
    styleUrl: './profile-intro.component.scss'
})
export class ProfileIntroComponent {}