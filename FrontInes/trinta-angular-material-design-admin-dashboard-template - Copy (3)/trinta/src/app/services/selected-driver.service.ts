import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedDriverService {
  private selectedRowSource = new BehaviorSubject<PeriodicElement | null>(null);
  selectedRow$ = this.selectedRowSource.asObservable();

  private dataSource = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);
  data$ = this.dataSource.asObservable();
  private driverUpdateSource = new Subject<{ idtoken: string, driverName: string }>();
  driverUpdate$ = this.driverUpdateSource.asObservable();
  constructor() {this.loadDriversFromLocalStorage();}


  updateDriver(idtoken: string, driverName: string) {
    this.driverUpdateSource.next({ idtoken, driverName });
    this.saveDriverToLocalStorage(idtoken, driverName);
  }
  updateSelectedRow(row: PeriodicElement | null): void {
    this.selectedRowSource.next(row);
  }

  private saveDriverToLocalStorage(idtoken: string, driverName: string) {
    let drivers = this.getDriversFromLocalStorage();
    if (driverName) {
      drivers[idtoken] = driverName;
    } else {
      delete drivers[idtoken];
    }
    localStorage.setItem('drivers', JSON.stringify(drivers));
    // Synchronize with dataSource
    this.updateDataSource();
  }

  private loadDriversFromLocalStorage() {
    const drivers = this.getDriversFromLocalStorage();
    this.updateDataSource();
    for (const [idtoken, driverName] of Object.entries(drivers)) {
      this.driverUpdateSource.next({ idtoken, driverName });
    }
  }

  private getDriversFromLocalStorage(): { [idtoken: string]: string } {
    const drivers = localStorage.getItem('drivers');
    return drivers ? JSON.parse(drivers) : {};
  }

  private updateDataSource() {
    const drivers = this.getDriversFromLocalStorage();
    const updatedData = ELEMENT_DATA.map(item => ({
      ...item,
      driver: drivers[item.idtoken] || ''
    }));
    this.dataSource.next(updatedData);
  }
  clearDriver(idtoken: string) {
    const data = this.dataSource.getValue();
    const updatedData = data.map(item => 
      item.idtoken === idtoken ? { ...item, driver: '' } : item
    );
    this.dataSource.next(updatedData);
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
  project?: string; // optional properties
  budget?: string;
  members?: any;
  dueDate?: string;
  
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