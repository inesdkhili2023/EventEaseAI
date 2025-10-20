import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-p-user-profile',
    standalone: true,
    imports: [RouterLink, MatCardModule, FeathericonsModule],
    templateUrl: './p-user-profile.component.html',
    styleUrl: './p-user-profile.component.scss'
})
export class PUserProfileComponent {}