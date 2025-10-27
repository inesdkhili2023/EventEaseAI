import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-user-bio:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, FeathericonsModule],
    templateUrl: './user-bio.component.html',
    styleUrl: './user-bio.component.scss'
})
export class UserBioComponent {}