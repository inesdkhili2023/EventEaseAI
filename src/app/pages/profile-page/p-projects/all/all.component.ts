import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild,OnInit,OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AssignDriverDialogComponent } from '../../../../assign-driver-dialog/assign-driver-dialog.component';
import { AssignDriverDoneComponent } from '../../../../assign-driver-done/assign-driver-done.component';
import { SelectedDriverService } from '../../../../services/selected-driver.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-all:not(3)',
    standalone: true,
    imports: [CommonModule,RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule, MatProgressBarModule],
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit,OnDestroy {
drivers = [
        { name: 'Driver 1', email: 'driver1@example.com', number: '+01 2345 6789', status: 'Active' },
        { name: 'Driver 2', email: 'driver2@example.com', number: '+02 3456 7890', status: 'Inactive' },
        { name: 'Driver 3', email: 'driver3@example.com', number: '+03 4567 8901', status: 'Active' },
        // Add more drivers as needed
      ];

displayedColumns: string[] = ['project','idtoken', 'completion', 'members',  'status', 'budget', 'dueDate','driver','outat','dueamount', 'action'];

dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    private selectedDriverSubscription: Subscription;
    private dataSubscription: Subscription;

    selectedRow: PeriodicElement | null = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(public dialog: MatDialog, private cd: ChangeDetectorRef,private driverService:SelectedDriverService) {}
  
    
   
    ngOnInit(): void {
      this.dataSubscription = this.driverService.data$.subscribe(data => {
        this.dataSource.data = data;
        console.log('DataSource updated in AllComponent:', this.dataSource.data);
      });
      this.selectedDriverSubscription = this.driverService.selectedRow$.subscribe(selectedRow => {
        this.selectedRow = selectedRow;
      });
    
      this.selectedDriverSubscription = this.driverService.selectedRow$.subscribe(row => {
        this.selectedRow = row;
      });
    }
    

    
  
    ngOnDestroy(): void {
      if (this.selectedDriverSubscription) {
        this.selectedDriverSubscription.unsubscribe();
      }
      if (this.dataSubscription) {
        this.dataSubscription.unsubscribe();
      }
    }
  
    onCheckboxChange(event: any, element: PeriodicElement): void {
      if (event.checked) {
        this.driverService.updateSelectedRow(element);
        console.log('Selected row:', element);
      } else {
        this.driverService.updateSelectedRow(null);
        console.log('Deselected row');
      }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    openAssignDriverDialog(): void {
      if (this.selectedRow) { // Check if selectedRow is not null
        const dialogRef = this.dialog.open(AssignDriverDialogComponent, {
          width: '650px',
          data: { driver: this.selectedRow.driver }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateDriver(this.selectedRow!.idtoken, result.name); // Use non-null assertion since we've checked for null
          }
        });
      } else {
        alert('You should choose a ticket first');
      }
    }
    

   
    updateDriver(idtoken: string, driverName: string): void {
      // Find the index of the element to be updated
      const index = this.dataSource.data.findIndex(item => item.idtoken === idtoken);
      
      if (index !== -1) {
        // Log current and new driver values
        const element = this.dataSource.data[index];
        console.log(`Updating driver for idtoken ${idtoken} from ${element.driver} to ${driverName}`);
        
        // Update the driver in the array
        this.dataSource.data[index] = { ...element, driver: driverName };
        
        // Refresh the data source by creating a new array reference
        this.dataSource.data = [...this.dataSource.data];
        
        // Log the updated data source
        console.log('Updated Data Source:', this.dataSource.data);
    
        // Optionally trigger change detection
        this.cd.detectChanges();
      } else {
        console.error(`Element with idtoken ${idtoken} not found`);
      }
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
      driver: 'John Doe',
      outat: '10:00 AM',
      dueamount: '$50.2k',
      action: {
          edit: 'ri-edit-line',
          delete: 'ri-delete-bin-line'
      }
  }
];

