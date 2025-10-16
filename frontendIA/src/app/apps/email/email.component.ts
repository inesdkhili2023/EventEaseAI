import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-email',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './email.component.html',
    styleUrl: './email.component.scss'
})
export class EmailComponent {}