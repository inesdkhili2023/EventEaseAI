import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { AssignDriverDoneComponent } from '../assign-driver-done/assign-driver-done.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { SelectedDriverService } from '../services/selected-driver.service';


@Component({
  selector: 'app-assign-driver-dialog',
  standalone: true,
  imports: [MatTableModule,CommonModule, MatDialogModule, MatRadioModule, MatFormFieldModule],
  templateUrl: './assign-driver-dialog.component.html',
  styleUrls: ['./assign-driver-dialog.component.scss']
})
export class AssignDriverDialogComponent {
  drivers = [
    { name: 'Driver 1', email: 'driver1@example.com', number: '+01 2345 6789', status: 'Active' },
    { name: 'Driver 2', email: 'driver2@example.com', number: '+02 3456 7890', status: 'Inactive' },
    { name: 'Driver 3', email: 'driver3@example.com', number: '+03 4567 8901', status: 'Active' },
    // Add more drivers as needed
  ];
  displayedColumns: string[] = ['name', 'email', 'number', 'status'];
  selectedDriver: any = null;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<AssignDriverDialogComponent>,
              private driverService: SelectedDriverService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onDriverSelected(driver: any): void {
    this.selectedDriver = driver;
    console.log('Selected Driver:', driver.name);
  }

  openConfirmationDialog(driver: any): void {
    const dialogRef = this.dialog.open(AssignDriverDoneComponent, {
      width: '350px',
      data: { driverName: driver.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      // Handle after the confirmation dialog is closed
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.selectedDriver) {
      // Pass the selected driver back to the parent component
      this.dialogRef.close(this.selectedDriver);
      this.openConfirmationDialog(this.selectedDriver);
    } 
  }
}
