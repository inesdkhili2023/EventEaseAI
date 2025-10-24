import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule
  ],
})
export class EmailDialogComponent {
  onSend() {
    // Implementation for sending the email
  }

  onCancel() {
    // Implementation for canceling the action
  }
}
