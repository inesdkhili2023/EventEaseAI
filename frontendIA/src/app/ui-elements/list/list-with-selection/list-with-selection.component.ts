import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-list-with-selection',
    standalone: true,
    imports: [MatListModule],
    templateUrl: './list-with-selection.component.html',
    styleUrl: './list-with-selection.component.scss'
})
export class ListWithSelectionComponent {

    typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

}