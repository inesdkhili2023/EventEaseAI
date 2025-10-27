import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-print-confirmation-dialog',
  templateUrl: './print-confirmation-dialog.component.html',
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class PrintConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<PrintConfirmationDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
