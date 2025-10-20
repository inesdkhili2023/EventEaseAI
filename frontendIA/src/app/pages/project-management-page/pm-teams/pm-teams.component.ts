import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-pm-teams',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, FeathericonsModule],
    templateUrl: './pm-teams.component.html',
    styleUrl: './pm-teams.component.scss'
})
export class PmTeamsComponent {}