import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notifications-page',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss'
})
export class NotificationsPageComponent {}