import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-no-printer-dialog',
  templateUrl: './no-printer-dialog.component.html',
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class NoPrinterDialogComponent {
  constructor(public dialogRef: MatDialogRef<NoPrinterDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
