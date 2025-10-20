import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-support-tickets',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './support-tickets.component.html',
    styleUrl: './support-tickets.component.scss'
})
export class SupportTicketsComponent {}