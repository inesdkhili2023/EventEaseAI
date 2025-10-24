import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { OrderInfoModalComponent } from '../../order-info-modal/order-info-modal.component';
import { AssignDriverDoneComponent } from '../../assign-driver-done/assign-driver-done.component';
import { AssignDriverDialogComponent } from '../../assign-driver-dialog/assign-driver-dialog.component';
import { UnassignDriverDialogComponent } from '../../unassign-driver-dialog/unassign-driver-dialog.component';
import { AddUserComponent } from '../users-page/add-user/add-user.component';
import { KitchenStatusDialogComponent } from '../../kitchen-status-dialog/kitchen-status-dialog.component';
import { SelectedDriverService } from '../../services/selected-driver.service';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatCardModule, MatButtonModule, FeathericonsModule, MatDialogModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectedDriverSubscription: Subscription;

  selectedRow: PeriodicElement | null = null;
  constructor(private dialog: MatDialog,private driverService:SelectedDriverService) {}
  ngOnInit(): void {
    this.selectedDriverSubscription = this.driverService.selectedRow$.subscribe(selectedRow => {
      this.selectedRow = selectedRow;
    });
  }
  openOrderInfoModal() {
    const dialogRef = this.dialog.open(OrderInfoModalComponent, {
      width: '400px',
      // any other configurations like data passing
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(AssignDriverDoneComponent, {
      width: '350px',
    });
}



openAssignDriverDialog(): void {
  if (this.selectedRow) { // Ensure that selectedRow is not null
    const dialogRef = this.dialog.open(AssignDriverDialogComponent, {
      width: '650px',
      data: { driver: this.selectedRow.driver }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.driverService.updateDriver(this.selectedRow!.idtoken, result.name); // Non-null assertion
      }
    });
  } else {
    alert('You should select a ticket first');
  }
}

openUnassignDriverDialog(): void {
  if (this.selectedRow) { // Ensure that a row is selected
    const dialogRef = this.dialog.open(UnassignDriverDialogComponent, {
      width: '350px',
      data: { driver: this.selectedRow.driver } // Pass necessary data here
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming result contains the idtoken to clear driver
        this.driverService.clearDriver(this.selectedRow!.idtoken);
      }
    });
  } else {
    alert('You should select a ticket first');
  }
}

clearDriver(idtoken: string): void {
  const element = this.dataSource.data.find(item => item.idtoken === idtoken);

  if (element) {
    element.driver = ''; // Clear the driver
    this.dataSource.data = [...this.dataSource.data]; // Refresh the data source
  }
}


openKitchenStatusDialog(): void {
  const dialogRef = this.dialog.open(KitchenStatusDialogComponent, {
    width: '500px',
    data: {
      ticketId: '1722747874353',
      startTime: new Date().toISOString(),
      server: 'Adam K',
      items: [
        { name: '1x SMALL PAN CHICKEN PIZZA', status: 'Not sent' }
      ]
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
export interface PeriodicElement {
  project: any;
  
  budget: string;
  members: any;
  dueDate: string;
  status: any;
  action: any;
  driver:string;
  outat:string;
  dueamount:string;
  idtoken:any;
}
export const ELEMENT_DATA: PeriodicElement[] = [
  {
      project: {
          title: 'Deploy The App To App Stores',
          assigned: '07 Mar 2024',
      },
      idtoken: 'ABC123',
      
      members: [
          {
              name: 'Charlotte Lee',
              img: 'assets/images/users/user1.jpg'
          },
          {
              name: 'Benjamin Clark',
              img: 'assets/images/users/user2.jpg'
          },
          {
              name: 'William Anderson',
              img: 'assets/images/users/user3.jpg'
          }
      ],
      status: {
          active: 'Active',
      },
      budget: '$100.5k',
      dueDate: '08 Mar 2024',
      driver: '',
      outat: '10:00 AM',
      dueamount: '$50.2k',
      action: {
          edit: 'ri-edit-line',
          delete: 'ri-delete-bin-line'
      }
  }
];




