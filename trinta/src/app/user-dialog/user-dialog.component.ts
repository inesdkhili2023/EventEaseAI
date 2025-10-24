import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatRadioModule,MatFormFieldModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>) {}
}
