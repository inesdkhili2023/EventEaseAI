import { Component, ViewChild, AfterViewInit, Input,OnInit,OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectionService } from '../../../../services/selection.service';
import { TokenService } from '../../../../token/token.service'; 
import { OrderInfoModalComponent } from '../../../../order-info-modal/order-info-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SelectedDriverService } from '../../../../services/selected-driver.service';
import { Subscription } from 'rxjs';
import { AssignDriverDialogComponent } from '../../../../assign-driver-dialog/assign-driver-dialog.component';
import { AssignDriverDoneComponent } from '../../../../assign-driver-done/assign-driver-done.component';
import { ChangeDetectorRef } from '@angular/core';




@Component({
    selector: 'app-pending:not(2)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule, MatProgressBarModule, CommonModule,FormsModule,MatIconModule],
    templateUrl: './pending.component.html',
    styleUrl: './pending.component.scss'
})
export class PendingComponent  implements AfterViewInit,OnInit,OnDestroy {
  drivers = [
    { name: 'Driver 1', email: 'driver1@example.com', number: '+01 2345 6789', status: 'Active' },
    { name: 'Driver 2', email: 'driver2@example.com', number: '+02 3456 7890', status: 'Inactive' },
    { name: 'Driver 3', email: 'driver3@example.com', number: '+03 4567 8901', status: 'Active' },
    // Add more drivers as needed
  ];
  @Input() filteredData: any[] = []; 

  displayedColumns: string[] = ['checkbox','idtoken','Customer', 'address','zipCode','status',  'NeededOn','totalamount',   'dueamount', 'driver', 'outat',  'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  private selectedDriverSubscription: Subscription;
    private dataSubscription: Subscription;

    selectedRow: PeriodicElement | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchText: string = ''; 

  selectedCheckboxes: boolean[] = new Array(ELEMENT_DATA.length).fill(false);

  constructor(private selectionService: SelectionService,private tokenService: TokenService,
    private dialog: MatDialog, private cd: ChangeDetectorRef,private driverService:SelectedDriverService) {}
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
  onCheckboxChange(event: any, element: PeriodicElement): void {
    if (event.checked) {
      this.driverService.updateSelectedRow(element);
      console.log('Selected row:', element);
    } else {
      this.driverService.updateSelectedRow(null);
      console.log('Deselected row');
    }
  }
  
  
  
  
  
  onCheckboxChange1(event: MatCheckboxChange, index: number) {
    
    this.selectedCheckboxes[index] = event.checked;
    this.selectionService.updateSelectionState(this.isAnyCheckboxSelected());
  }

  isAnyCheckboxSelected(): boolean {
    return this.selectedCheckboxes.some(checked => checked);
  }
  applyFilter() {
   
      const searchText = this.searchText.toLowerCase();
  
   
      const filteredResults = this.filteredData.filter(item => {
        return item.customer.name.toLowerCase().includes(searchText) ||
        item.driver.toLowerCase().includes(searchText) ||
        item.NeededOn.toLowerCase().includes(searchText) ||
        item.dueamount.toLowerCase().includes(searchText) ||
        item.zipCode.some((member: string) => member.toLowerCase().includes(searchText));
      });
  
    
      this.dataSource.data = filteredResults;
    }
    onRowClick(element: PeriodicElement) {
      this.tokenService.setIdToken(element.idtoken);
     
    }
    deleteRow(element: PeriodicElement): void {
      // Find the index of the element
      const index = this.dataSource.data.indexOf(element);
    
      // If the element is found, remove it from the data array
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        // Update the data source to trigger UI changes
        this.dataSource.data = [...this.dataSource.data];
      }
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