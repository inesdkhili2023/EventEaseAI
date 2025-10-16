import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-animations',
    standalone: true,
    imports: [MatButtonModule, MatCardModule],
    templateUrl: './dialog-animations.component.html',
    styleUrl: './dialog-animations.component.scss'
})
export class DialogAnimationsComponent {

    // Dialog Animations
    constructor(
        public dialog: MatDialog
    ) {}
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(DialogAnimationsExampleDialog, {
            width: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

}

// Dialog Overview Example Dialog
@Component({
    selector: 'dialog-animations-example-dialog',
    templateUrl: 'dialog-animations-example-dialog.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
    ) {}

}