import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from './feathericons.module';

@Component({
    selector: 'app-feathericons',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './feathericons.component.html',
    styleUrl: './feathericons.component.scss'
})
export class FeathericonsComponent {}