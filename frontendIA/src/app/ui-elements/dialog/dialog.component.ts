import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import { DialogAnimationsComponent } from './dialog-animations/dialog-animations.component';
import { DialogScrollableContentComponent } from './dialog-scrollable-content/dialog-scrollable-content.component';
import { DialogLaunchedFromMenuComponent } from './dialog-launched-from-menu/dialog-launched-from-menu.component';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [RouterLink, BasicDialogComponent, DialogAnimationsComponent, DialogScrollableContentComponent, DialogLaunchedFromMenuComponent],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {}