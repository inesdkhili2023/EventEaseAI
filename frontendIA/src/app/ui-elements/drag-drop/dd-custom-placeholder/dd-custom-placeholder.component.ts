import { Component } from '@angular/core';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDragPlaceholder,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-dd-custom-placeholder',
    standalone: true,
    imports: [CdkDropList, CdkDrag, CdkDragPlaceholder],
    templateUrl: './dd-custom-placeholder.component.html',
    styleUrl: './dd-custom-placeholder.component.scss'
})
export class DdCustomPlaceholderComponent {

    movies = [
        'Episode I - The Phantom Menace',
        'Episode II - Attack of the Clones',
        'Episode III - Revenge of the Sith',
        'Episode IV - A New Hope',
        'Episode V - The Empire Strikes Back',
        'Episode VI - Return of the Jedi',
        'Episode VII - The Force Awakens',
        'Episode VIII - The Last Jedi',
        'Episode IX - The Rise of Skywalker',
    ];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }

}