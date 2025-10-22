import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-starter',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './starter.component.html',
    styleUrl: './starter.component.scss'
})
export class StarterComponent {}