import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-dialog-launched-from-menu',
    standalone: true,
    imports: [MatButtonModule, MatMenuModule, MatCardModule],
    templateUrl: './dialog-launched-from-menu.component.html',
    styleUrl: './dialog-launched-from-menu.component.scss'
})
export class DialogLaunchedFromMenuComponent {

    // Dialog launched from a menu
    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    constructor(
        public dialog: MatDialog
    ) {}

    openDialog() {
        const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});

        // Manually restore focus to the menu trigger since the element that
        // opens the dialog won't be in the DOM any more when the dialog closes.
        dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    }

}

// Dialog Overview Example Dialog
@Component({
    selector: 'dialog-from-menu-dialog',
    templateUrl: 'dialog-from-menu-example-dialog.html',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogFromMenuExampleDialog {}