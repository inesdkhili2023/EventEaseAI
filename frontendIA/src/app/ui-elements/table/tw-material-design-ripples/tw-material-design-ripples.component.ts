import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

const ELEMENT_DATA = [
    {name: 'Hydrogen'},
    {name: 'Helium'},
    {name: 'Lithium'},
    {name: 'Beryllium'},
    {name: 'Boron'},
    {name: 'Carbon'},
    {name: 'Nitrogen'},
    {name: 'Oxygen'},
    {name: 'Fluorine'},
    {name: 'Neon'},
];

@Component({
    selector: 'app-tw-material-design-ripples',
    standalone: true,
    imports: [MatTableModule, MatRippleModule],
    templateUrl: './tw-material-design-ripples.component.html',
    styleUrl: './tw-material-design-ripples.component.scss'
})
export class TwMaterialDesignRipplesComponent {

    displayedColumns: string[] = ['name'];
    dataSource = ELEMENT_DATA;

}