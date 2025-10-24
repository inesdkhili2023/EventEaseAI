import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-list-with-single-selection',
    standalone: true,
    imports: [MatListModule],
    templateUrl: './list-with-single-selection.component.html',
    styleUrl: './list-with-single-selection.component.scss'
})
export class ListWithSingleSelectionComponent {

    typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

}