import {Component, Inject} from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-basic-dialog',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCardModule],
    templateUrl: './basic-dialog.component.html',
    styleUrl: './basic-dialog.component.scss'
})
export class BasicDialogComponent {

    // Basic Dialog
    animal: string;
    name: string;

    constructor(
        public dialog: MatDialog
    ) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: {name: this.name, animal: this.animal},
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

}

// Dialog Overview Example Dialog
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ]
})
export class DialogOverviewExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}