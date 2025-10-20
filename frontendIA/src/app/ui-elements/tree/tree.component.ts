import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TwFlatNodesComponent } from './tw-flat-nodes/tw-flat-nodes.component';
import { TwNestedNodesComponent } from './tw-nested-nodes/tw-nested-nodes.component';
import { TwDynamicDataComponent } from './tw-dynamic-data/tw-dynamic-data.component';
import { TwPartiallyLoadedDataComponent } from './tw-partially-loaded-data/tw-partially-loaded-data.component';

@Component({
    selector: 'app-tree',
    standalone: true,
    imports: [RouterLink, MatCardModule, TwFlatNodesComponent, TwNestedNodesComponent, TwDynamicDataComponent, TwPartiallyLoadedDataComponent],
    templateUrl: './tree.component.html',
    styleUrl: './tree.component.scss'
})
export class TreeComponent {}