import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-buttons',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
    templateUrl: './buttons.component.html',
    styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {}