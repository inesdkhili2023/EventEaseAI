import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

export interface Vegetable {
    name: string;
}

@Component({
    selector: 'app-chips-drag-drop',
    standalone: true,
    imports: [MatChipsModule, CdkDropList, CdkDrag, MatCardModule],
    templateUrl: './chips-drag-drop.component.html',
    styleUrl: './chips-drag-drop.component.scss'
})
export class ChipsDragDropComponent {

    // Chips Drag & Drop
    vegetables: Vegetable[] = [
        {name: 'apple'},
        {name: 'banana'},
        {name: 'strawberry'},
        {name: 'orange'},
        {name: 'kiwi'},
        {name: 'cherry'},
    ];
    drop(event: CdkDragDrop<Vegetable[]>) {
        moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
    }

}