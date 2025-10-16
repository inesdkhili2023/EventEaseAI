import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-event-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './event-details.component.html',
    styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {}