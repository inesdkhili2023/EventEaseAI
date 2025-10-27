import { Component , Inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-assign-driver-done',
  standalone: true,
  imports: [MatDialogModule,CommonModule,MatDialogModule, MatRadioModule,MatFormFieldModule],
  templateUrl: './assign-driver-done.component.html',
  styleUrl: './assign-driver-done.component.scss'
})
export class AssignDriverDoneComponent {
  constructor(
    public dialogRef: MatDialogRef<AssignDriverDoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ driverName: string}
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }

}
