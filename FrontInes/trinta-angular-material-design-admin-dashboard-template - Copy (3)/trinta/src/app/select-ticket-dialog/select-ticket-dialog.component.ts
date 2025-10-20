import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-ticket-dialog',
  templateUrl: './select-ticket-dialog.component.html',
  styleUrls: ['./select-ticket-dialog.component.scss']
})
export class SelectTicketDialogComponent {
  constructor(public dialogRef: MatDialogRef<SelectTicketDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
