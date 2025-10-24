import { Component, ElementRef, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search/search.pipe';

@Component({
  selector: 'app-e-customers-list',
  standalone: true,
  imports: [
    RouterLink, MatCardModule, MatButtonModule, MatMenuModule,
    MatPaginatorModule, MatTableModule, NgIf, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatTabsModule, FormsModule, MatSelectModule, ReactiveFormsModule, FeathericonsModule,
    CommonModule, SearchPipe
  ],
  templateUrl: './e-customers-list.component.html',
  styleUrls: ['./e-customers-list.component.scss']
})
export class ECustomersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'customer', 'email', 'status', 'Adress', 'action'];
  displayedHistoryColumns: string[] = ['ticketId', 'server', 'created', 'customer', 'total'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  historyDataSource = new MatTableDataSource<HistoryElement>(HISTORY_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  @ViewChild('newCustomerDialog') newCustomerDialog: TemplateRef<any>;

  activeTab: string = 'Details';
  isHistoryRowSelected: boolean = false;
  selectedHistoryRow: any = null;
  customerForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      phone: ['', Validators.required],
      name: ['', Validators.required],
      personalEmail: ['', [Validators.required, Validators.email]],
      businessEmail: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filteredDataSource.paginator = this.paginator;
  }

  openDialog(element: PeriodicElement = {} as PeriodicElement) {
    const customerHistory = HISTORY_DATA.filter(history => history.customer === element.id);
    this.historyDataSource = new MatTableDataSource<HistoryElement>(customerHistory);
    this.dialog.open(this.dialogTemplate, { data: element });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.closeDialog();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.isHistoryRowSelected = false;
  }

  isDetailsTabActive(): boolean {
    return this.activeTab === 'Details';
  }

  openNewCustomerDialog(): void {
    this.dialog.open(this.newCustomerDialog);
  }

  onHistoryRowClick(row: any): void {
    this.selectedHistoryRow = row;
    this.isHistoryRowSelected = true;
  }

  onOrderInfoClick(): void {
    console.log('Order Info button clicked');
  }

  onSearch(searchText: string): void {
    this.filteredDataSource.data = new SearchPipe().transform(this.dataSource.data, searchText);
  }
}


export interface PeriodicElement {
    customer: any;
    email: string;
    id: string;
    status: any;
    Adress: string;
    action: any;
    walletBalance?: number;
    loyaltyPoint?: number;
    creditLimit?: number;
    memberType?: string;
    memberSince?: string;
    membershipExpiration?: string;
}

export interface HistoryElement {
    ticketId: string;
    server: string;
    created: string;
    customer: string;
    total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
      customer: {
          img: 'assets/images/users/user1.jfif',
          name: 'Sarah Rodriguez',
          number: '+03 4567 8900'
      },
      email: 'rodriguez@trinta.com',
      id: 'CUS001',
      status: {
          active: 'Active',
      },
      Adress: 'Ethereal Blossom, Grove',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1000,
      loyaltyPoint: 200,
      creditLimit: 5000,
      memberType: 'Gold',
      memberSince: '2019-01-01',
      membershipExpiration: '2024-01-01'
  },
  {
      customer: {
          img: 'assets/images/users/user2.avif',
          name: 'Marcus Davis',
          number: '+03 4567 8900'
      },
      email: 'davis@trinta.com',
      id: 'CUS002',
      status: {
          deactive: 'Deactive',
      },
      Adress: 'Enchanted Silver Moon, Valley',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 500,
      loyaltyPoint: 100,
      creditLimit: 3000,
      memberType: 'Silver',
      memberSince: '2020-05-15',
      membershipExpiration: '2023-05-15'
  },
  {
      customer: {
          img: 'assets/images/users/user3.jpg',
          name: 'Emily Johnson',
          number: '+03 4567 8900'
      },
      email: 'johnson@trinta.com',
      id: 'CUS003',
      status: {
          active: 'Active',
      },
      Adress: 'Whispering Willow, Haven',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 2000,
      loyaltyPoint: 300,
      creditLimit: 7000,
      memberType: 'Platinum',
      memberSince: '2018-07-10',
      membershipExpiration: '2024-07-10'
  },
  {
      customer: {
          img: 'assets/images/users/user9.jpg',
          name: 'William Anderson',
          number: '+03 4567 8900'
      },
      email: 'anderson@trinta.com',
      id: 'CUS004',
      status: {
          deactive: 'Deactive',
      },
      Adress: 'Sapphire Serenity, Cove',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1500,
      loyaltyPoint: 250,
      creditLimit: 6000,
      memberType: 'Gold',
      memberSince: '2017-03-25',
      membershipExpiration: '2023-03-25'
  },
  {
      customer: {
          img: 'assets/images/users/user10.jpg',
          name: 'Charlotte Lee',
          number: '+03 4567 8900'
      },
      email: 'lee@trinta.com',
      id: 'CUS005',
      status: {
          active: 'Active',
      },
      Adress: 'Twilight Enigma, Sanctuary',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 2500,
      loyaltyPoint: 350,
      creditLimit: 8000,
      memberType: 'Platinum',
      memberSince: '2016-11-13',
      membershipExpiration: '2024-11-13'
  },
  {
      customer: {
          img: 'assets/images/users/user6.jpg',
          name: 'Xavier Rodriguez',
          number: '+03 4567 8900'
      },
      email: 'rodriguez@trinta.com',
      id: 'CUS006',
      status: {
          converted: 'Converted',
      },
      Adress: 'Celestial Harmony, Meadow',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 800,
      loyaltyPoint: 150,
      creditLimit: 4000,
      memberType: 'Silver',
      memberSince: '2019-06-09',
      membershipExpiration: '2023-06-09'
  },
  {
      customer: {
          img: 'assets/images/users/user9.jpg',
          name: 'Sophia Nguyen',
          number: '+03 4567 8900'
      },
      email: 'nguyen@trinta.com',
      id: 'CUS007',
      status: {
          active: 'Active',
      },
      Adress: 'Crimson Horizon, Bluff',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1200,
      loyaltyPoint: 220,
      creditLimit: 5200,
      memberType: 'Gold',
      memberSince: '2021-02-20',
      membershipExpiration: '2025-02-20'
  },
  {
      customer: {
          img: 'assets/images/users/user19.jpg',
          name: 'Elijah Benjamin',
          number: '+03 4567 8900'
      },
      email: 'benjamin@trinta.com',
      id: 'CUS008',
      status: {
          active: 'Active',
      },
      Adress: 'Radiant Cascade, Oasis',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1800,
      loyaltyPoint: 270,
      creditLimit: 6500,
      memberType: 'Gold',
      memberSince: '2020-09-15',
      membershipExpiration: '2024-09-15'
  },
  {
      customer: {
          img: 'assets/images/users/user19.jpg',
          name: 'Elijah Benjamin',
          number: '+03 4567 8900'
      },
      email: 'benjamin@trinta.com',
      id: 'CUS009',
      status: {
          deactive: 'Deactive',
      },
      Adress: 'Radiant Cascade, Oasis',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 600,
      loyaltyPoint: 120,
      creditLimit: 3200,
      memberType: 'Silver',
      memberSince: '2022-01-05',
      membershipExpiration: '2023-01-05'
  },
  {
      customer: {
          img: 'assets/images/users/user9.jpg',
          name: 'Sophia Nguyen',
          number: '+03 4567 8900'
      },
      email: 'nguyen@trinta.com',
      id: 'CUS010',
      status: {
          deactive: 'Deactive',
      },
      Adress: 'Crimson Horizon, Bluff',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 500,
      loyaltyPoint: 80,
      creditLimit: 2500,
      memberType: 'Bronze',
      memberSince: '2021-12-20',
      membershipExpiration: '2023-12-20'
  },
  {
      customer: {
          img: 'assets/images/users/user6.jpg',
          name: 'Xavier Rodriguez',
          number: '+03 4567 8900'
      },
      email: 'rodriguez@trinta.com',
      id: 'CUS011',
      status: {
          active: 'Active',
      },
      Adress: 'Celestial Harmony, Meadow',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1700,
      loyaltyPoint: 260,
      creditLimit: 6000,
      memberType: 'Gold',
      memberSince: '2018-05-15',
      membershipExpiration: '2024-05-15'
  },
  {
      customer: {
          img: 'assets/images/users/user10.jpg',
          name: 'Charlotte Lee',
          number: '+03 4567 8900'
      },
      email: 'lee@trinta.com',
      id: 'CUS012',
      status: {
          active: 'Active',
      },
      Adress: 'Twilight Enigma, Sanctuary',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 2300,
      loyaltyPoint: 330,
      creditLimit: 7500,
      memberType: 'Platinum',
      memberSince: '2016-11-13',
      membershipExpiration: '2024-11-13'
  },
  {
      customer: {
          img: 'assets/images/users/user9.jpg',
          name: 'William Anderson',
          number: '+03 4567 8900'
      },
      email: 'anderson@trinta.com',
      id: 'CUS013',
      status: {
          converted: 'Converted',
      },
      Adress: 'Sapphire Serenity, Cove',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 1400,
      loyaltyPoint: 240,
      creditLimit: 5200,
      memberType: 'Gold',
      memberSince: '2019-08-21',
      membershipExpiration: '2023-08-21'
  },
  {
      customer: {
          img: 'assets/images/users/user3.jpg',
          name: 'Emily Johnson',
          number: '+03 4567 8900'
      },
      email: 'johnson@trinta.com',
      id: 'CUS014',
      status: {
          deactive: 'Deactive',
      },
      Adress: 'Whispering Willow, Haven',
      action: {
          Details: 'ri-arrow-right-line',
      },
      walletBalance: 900,
      loyaltyPoint: 130,
      creditLimit: 4100,
      memberType: 'Silver',
      memberSince: '2020-11-11',
      membershipExpiration: '2023-11-11'
  }
];


const HISTORY_DATA: HistoryElement[] = [
  {
    ticketId: 'T001',
    server: 'Server A',
    created: '2024-01-15',
    customer: 'CUS001',
    total: '$150'
  },
  {
    ticketId: 'T002',
    server: 'Server B',
    created: '2024-02-20',
    customer: 'CUS001',
    total: '$200'
  },
  {
    ticketId: 'T003',
    server: 'Server A',
    created: '2024-03-10',
    customer: 'CUS002',
    total: '$120'
  },
  {
    ticketId: 'T004',
    server: 'Server C',
    created: '2024-01-22',
    customer: 'CUS002',
    total: '$250'
  },
  {
    ticketId: 'T005',
    server: 'Server A',
    created: '2024-04-05',
    customer: 'CUS003',
    total: '$300'
  },
  {
    ticketId: 'T006',
    server: 'Server B',
    created: '2024-05-15',
    customer: 'CUS003',
    total: '$180'
  },
  {
    ticketId: 'T007',
    server: 'Server C',
    created: '2024-06-18',
    customer: 'CUS004',
    total: '$210'
  },
  {
    ticketId: 'T008',
    server: 'Server A',
    created: '2024-07-22',
    customer: 'CUS004',
    total: '$220'
  },
  {
    ticketId: 'T009',
    server: 'Server B',
    created: '2024-01-14',
    customer: 'CUS005',
    total: '$340'
  },
  {
    ticketId: 'T010',
    server: 'Server C',
    created: '2024-02-11',
    customer: 'CUS005',
    total: '$150'
  },
  {
    ticketId: 'T011',
    server: 'Server A',
    created: '2024-03-14',
    customer: 'CUS006',
    total: '$160'
  },
  {
    ticketId: 'T012',
    server: 'Server B',
    created: '2024-04-18',
    customer: 'CUS006',
    total: '$190'
  },
  {
    ticketId: 'T013',
    server: 'Server A',
    created: '2024-05-20',
    customer: 'CUS007',
    total: '$210'
  },
  {
    ticketId: 'T014',
    server: 'Server C',
    created: '2024-06-24',
    customer: 'CUS007',
    total: '$130'
  },
  {
    ticketId: 'T015',
    server: 'Server B',
    created: '2024-07-12',
    customer: 'CUS008',
    total: '$170'
  },
  {
    ticketId: 'T016',
    server: 'Server A',
    created: '2024-01-17',
    customer: 'CUS009',
    total: '$140'
  },
  {
    ticketId: 'T017',
    server: 'Server C',
    created: '2024-02-14',
    customer: 'CUS009',
    total: '$150'
  },
  {
    ticketId: 'T018',
    server: 'Server B',
    created: '2024-03-19',
    customer: 'CUS010',
    total: '$190'
  },
  {
    ticketId: 'T019',
    server: 'Server A',
    created: '2024-04-21',
    customer: 'CUS010',
    total: '$110'
  },
  {
    ticketId: 'T020',
    server: 'Server C',
    created: '2024-05-23',
    customer: 'CUS011',
    total: '$180'
  },
  {
    ticketId: 'T021',
    server: 'Server B',
    created: '2024-06-25',
    customer: 'CUS011',
    total: '$210'
  },
  {
    ticketId: 'T022',
    server: 'Server A',
    created: '2024-07-18',
    customer: 'CUS012',
    total: '$230'
  },
  {
    ticketId: 'T023',
    server: 'Server C',
    created: '2024-01-20',
    customer: 'CUS012',
    total: '$250'
  },
  {
    ticketId: 'T024',
    server: 'Server B',
    created: '2024-02-22',
    customer: 'CUS013',
    total: '$160'
  },
  {
    ticketId: 'T025',
    server: 'Server A',
    created: '2024-03-24',
    customer: 'CUS013',
    total: '$220'
  },
  {
    ticketId: 'T026',
    server: 'Server C',
    created: '2024-04-27',
    customer: 'CUS014',
    total: '$140'
  },
  {
    ticketId: 'T027',
    server: 'Server B',
    created: '2024-05-29',
    customer: 'CUS014',
    total: '$190'
  }
];
