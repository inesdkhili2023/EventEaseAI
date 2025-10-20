import { Component } from '@angular/core';
import {
    CdkDragDrop,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-dd-connected-sorting-group',
    standalone: true,
    imports: [CdkDropListGroup, CdkDropList, CdkDrag],
    templateUrl: './dd-connected-sorting-group.component.html',
    styleUrl: './dd-connected-sorting-group.component.scss'
})
export class DdConnectedSortingGroupComponent {

    todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

    done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

}