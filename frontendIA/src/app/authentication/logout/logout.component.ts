import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss'
})
export class LogoutComponent {}