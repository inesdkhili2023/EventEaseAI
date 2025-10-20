import { Component, Inject, EventEmitter, Output } from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { UnassignDriverDoneComponent } from '../unassign-driver-done/unassign-driver-done.component';
import { SelectedDriverService } from '../services/selected-driver.service';
@Component({
  selector: 'app-unassign-driver-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogModule],
  templateUrl: './unassign-driver-dialog.component.html',
  styleUrls: ['./unassign-driver-dialog.component.scss'],
  providers: [SelectedDriverService],
})
export class UnassignDriverDialogComponent {
  @Output() driverCleared = new EventEmitter<string>();
  driverService: any;
  drivers = [
    {
      name: 'Driver 1',
      email: 'driver1@example.com',
      number: '+01 2345 6789',
      status: 'Active',
    },
    {
      name: 'Driver 2',
      email: 'driver2@example.com',
      number: '+02 3456 7890',
      status: 'Inactive',
    },
    {
      name: 'Driver 3',
      email: 'driver3@example.com',
      number: '+03 4567 8901',
      status: 'Active',
    },
    // Add more drivers as needed
  ];
  constructor(
    private dialog: MatDialog,
    driverService: SelectedDriverService,
    private dialogRef: MatDialogRef<UnassignDriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idtoken: string; driver: string }
  ) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(UnassignDriverDoneComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.clearDriverLocally(this.data.idtoken);
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    // Clear the driver locally
    this.openConfirmationDialog();
    // Open confirmation dialog after unassigning
    this.dialogRef.close('yes'); // Close the unassign dialog
  }

  clearDriverLocally(idtoken: string): void {
    const element = this.driverService
      .getData()
      .find((item: { idtoken: string }) => item.idtoken === idtoken);
    if (element) {
      element.driver = ''; // Clear the driver field
      this.driverCleared.emit(idtoken); // Emit the event
      console.log(`Driver cleared locally for idtoken ${idtoken}`);
    } else {
      console.error(`Element with idtoken ${idtoken} not found`);
    }
  }
}
