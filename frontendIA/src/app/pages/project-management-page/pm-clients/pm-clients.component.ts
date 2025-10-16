import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pm-clients',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './pm-clients.component.html',
    styleUrl: './pm-clients.component.scss'
})
export class PmClientsComponent {}