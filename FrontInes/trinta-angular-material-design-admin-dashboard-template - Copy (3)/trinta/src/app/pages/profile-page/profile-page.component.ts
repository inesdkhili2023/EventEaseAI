import { Component, OnInit } from '@angular/core';
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
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { AllComponent } from '../profile-page/p-projects/all/all.component';
import { SelectTicketDialogComponent } from '../../select-ticket-dialog/select-ticket-dialog.component'; // Import the dialog component
import { SelectionService } from '../../services/selection.service';
import { MatIconModule } from '@angular/material/icon';
import { KitchenStatusDialogComponent } from '../../kitchen-status-dialog/kitchen-status-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SelectedDriverService } from '../../services/selected-driver.service';
import { Router } from '@angular/router'; // Import Router











@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink,  MatIconModule, MatCardModule, MatButtonModule, FeathericonsModule, MatDialogModule, AllComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isButtonEnabled: boolean = false;
  selectedDriverSubscription: Subscription;

  selectedRow: PeriodicElement | null = null;

  constructor(private dialog: MatDialog, private selectionService: SelectionService,private driverService:SelectedDriverService,private router: Router) {}

  ngOnInit(): void {
    this.selectionService.selectionState$.subscribe(isSelected => {
      this.isButtonEnabled = isSelected;
      
    });
    this.selectedDriverSubscription = this.driverService.selectedRow$.subscribe(selectedRow => {
      this.selectedRow = selectedRow;
    });
  }

  openDialog(): void {
    if (!this.selectedRow) {
      this.showSelectTicketDialog(); // Show dialog if button is disabled
      return;
    }
    this.dialog.open(InfoDialogComponent, { width: '300px' });
  }
  onNewOrderClick(): void {
    if (!this.selectedRow) {
      this.showSelectTicketDialog(); // Show dialog if button is disabled
      return;
    }
  
    // Navigate to the desired route if button is enabled
    this.router.navigate(['/ecommerce-page/customers-list']);
  }
  

  openOrderInfoModal() {
    if (!this.selectedRow) {
      this.showSelectTicketDialog();
      return;
    }
    const dialogRef = this.dialog.open(OrderInfoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onDeliveryInfoClick(event: MouseEvent): void {
    if (!this.selectedRow) {
      event.preventDefault(); // Prevents the navigation
      this.showSelectTicketDialog();
      return;
    }
  
    // If isButtonEnabled is true, allow the navigation to proceed
    this.router.navigate(['/users/add-user']);
   
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
        this.showSelectTicketDialog();
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
        this.showSelectTicketDialog();
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
    if (this.selectedRow) {
   
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
  } else {
    this.showSelectTicketDialog();
  }

  }

  showSelectTicketDialog(): void {
    this.dialog.open(SelectTicketDialogComponent, {
      width: '300px'
    });
  }
  
}
export interface PeriodicElement {
  customer: any;
  totalamount: string;
  zipCode: any;
  NeededOn: string;
  status: string;
  action: any;
  driver: string;
  outat: string;
  dueamount: string;
  idtoken: any;

  
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    customer: {
      name: 'abc',
      phone :'96003001'

    },
    idtoken: 'ccccc',
    zipCode: '67890',
    status: 'Unpaid',  
    totalamount: '$100.5k',
    NeededOn: '08 Mar 2024',
    driver: 'ines dkhili',
    outat: '10:00 AM',
    dueamount: '$50.2k',
    action: { delete: 'ri-delete-bin-line' }
  },
  {
    customer: {
      name: 'abc',

    },
    idtoken: 'ABC123',
    zipCode: ['12345' 
     
    ],
    status: 'Paid',  // Initial status value
    totalamount: '$100.5k',
    NeededOn: '08 Mar 2024',
    driver: 'abcd',
    outat: '10:00 AM',
    dueamount: '$50.2k',
    action: { delete: 'ri-delete-bin-line' }
  },
];