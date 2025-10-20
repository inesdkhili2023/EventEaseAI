import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Fruit',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
    },
    {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
            },
            {
                name: 'Orange',
                children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
            },
        ],
    },
];

@Component({
    selector: 'app-tw-nested-nodes',
    standalone: true,
    imports: [MatTreeModule, MatButtonModule, MatIconModule],
    templateUrl: './tw-nested-nodes.component.html',
    styleUrl: './tw-nested-nodes.component.scss'
})
export class TwNestedNodesComponent {

    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FoodNode>();

    constructor() {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

}