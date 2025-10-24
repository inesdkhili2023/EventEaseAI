import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../..//../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [RouterLink, MatCardModule, FeathericonsModule],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent {}