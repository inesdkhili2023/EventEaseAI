import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDividerModule],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss'
})
export class CardsComponent {

    longText = `The Mateo Luca is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for.`;

}