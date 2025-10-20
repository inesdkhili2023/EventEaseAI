import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
    selector: 'app-dynamic-grid-list',
    standalone: true,
    imports: [MatGridListModule, MatCardModule],
    templateUrl: './dynamic-grid-list.component.html',
    styleUrl: './dynamic-grid-list.component.scss'
})
export class DynamicGridListComponent {

    // Dynamic Grid
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];

}