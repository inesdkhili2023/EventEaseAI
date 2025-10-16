import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { ListWithSectionsComponent } from './list-with-sections/list-with-sections.component';
import { ListWithSelectionComponent } from './list-with-selection/list-with-selection.component';
import { ListWithSingleSelectionComponent } from './list-with-single-selection/list-with-single-selection.component';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatListModule, ListWithSectionsComponent, ListWithSelectionComponent, ListWithSingleSelectionComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent {}