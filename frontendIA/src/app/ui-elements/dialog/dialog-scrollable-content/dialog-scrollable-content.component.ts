import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-dialog-scrollable-content',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatCardModule],
    templateUrl: './dialog-scrollable-content.component.html',
    styleUrl: './dialog-scrollable-content.component.scss'
})
export class DialogScrollableContentComponent {

    // Dialog with header, scrollable content and actions
    constructor(
        public dialog: MatDialog
    ) {}
    
    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}

// Dialog Overview Example Dialog
@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {}