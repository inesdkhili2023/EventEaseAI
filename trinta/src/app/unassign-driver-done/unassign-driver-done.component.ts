import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-unassign-driver-done',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './unassign-driver-done.component.html',
  styleUrl: './unassign-driver-done.component.scss'
})
export class UnassignDriverDoneComponent {

  constructor(public dialogRef: MatDialogRef<UnassignDriverDoneComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
