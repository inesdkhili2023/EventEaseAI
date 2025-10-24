import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-p-teams',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, FeathericonsModule],
    templateUrl: './p-teams.component.html',
    styleUrl: './p-teams.component.scss'
})
export class PTeamsComponent {}