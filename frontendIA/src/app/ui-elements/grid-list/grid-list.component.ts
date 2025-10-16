import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicGridListComponent } from './basic-grid-list/basic-grid-list.component';
import { DynamicGridListComponent } from './dynamic-grid-list/dynamic-grid-list.component';

@Component({
    selector: 'app-grid-list',
    standalone: true,
    imports: [RouterLink, BasicGridListComponent, DynamicGridListComponent],
    templateUrl: './grid-list.component.html',
    styleUrl: './grid-list.component.scss'
})
export class GridListComponent {}