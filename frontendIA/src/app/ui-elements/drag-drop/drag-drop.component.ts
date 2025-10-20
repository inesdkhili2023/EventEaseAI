import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DdConnectedSortingGroupComponent } from './dd-connected-sorting-group/dd-connected-sorting-group.component';
import { DdConnectedSortingComponent } from './dd-connected-sorting/dd-connected-sorting.component';
import { DdCustomPlaceholderComponent } from './dd-custom-placeholder/dd-custom-placeholder.component';
import { DdCustomPreviewComponent } from './dd-custom-preview/dd-custom-preview.component';
import { DdDisabledSortingComponent } from './dd-disabled-sorting/dd-disabled-sorting.component';
import { DdEnterPredicateComponent } from './dd-enter-predicate/dd-enter-predicate.component';
import { DdHorizontalSortingComponent } from './dd-horizontal-sorting/dd-horizontal-sorting.component';
import { DdOpenDraggableDialogComponent } from './dd-open-draggable-dialog/dd-open-draggable-dialog.component';
import { DdSortingComponent } from './dd-sorting/dd-sorting.component';

@Component({
    selector: 'app-drag-drop',
    standalone: true,
    imports: [RouterLink, MatCardModule, CdkDrag, CdkDragHandle, DdConnectedSortingGroupComponent, DdConnectedSortingComponent, DdCustomPlaceholderComponent, DdCustomPreviewComponent, DdDisabledSortingComponent, DdEnterPredicateComponent, DdHorizontalSortingComponent, DdOpenDraggableDialogComponent, DdSortingComponent],
    templateUrl: './drag-drop.component.html',
    styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent {}