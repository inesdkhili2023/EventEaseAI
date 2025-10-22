import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-events-page',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.scss'
})
export class EventsPageComponent {}