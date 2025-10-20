import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Importation de MatDialogRef
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importation de FormsModule

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    FormsModule // Ajoutez FormsModule ici
  ],
})
export class EmailDialogComponent {
  newEmail: string = '';

  // Injection de MatDialogRef dans le constructeur
  constructor(public dialogRef: MatDialogRef<EmailDialogComponent>) {}

  addKey(key: string) {
    this.newEmail += key;
  }

  clearLastCharacter() {
    this.newEmail = this.newEmail.slice(0, -1);
  }

  clearAll() {
    this.newEmail = '';
  }

  onSend() {
    // Logic to handle sending the email
    console.log('Sending email to:', this.newEmail);
    // Close the dialog after sending the email
    this.dialogRef.close();
  }

  onCancel() {
    // Logic to handle canceling the action
    console.log('Action canceled');
    // Close the dialog
    this.dialogRef.close();
  }
}
