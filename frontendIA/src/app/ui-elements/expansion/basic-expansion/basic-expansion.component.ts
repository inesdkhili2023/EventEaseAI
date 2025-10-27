import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-basic-expansion',
    standalone: true,
    imports: [MatExpansionModule, MatCardModule, MatButtonModule],
    templateUrl: './basic-expansion.component.html',
    styleUrl: './basic-expansion.component.scss'
})
export class BasicExpansionComponent {

    // Expansion
    panelOpenState = false;

}