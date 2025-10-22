import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [RouterOutlet, MatCardModule, RouterLinkActive, RouterLink, FeathericonsModule, MatButtonModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {}