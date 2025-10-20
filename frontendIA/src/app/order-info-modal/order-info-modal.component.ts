import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PrinterService } from './printer.service';
import { NoPrinterDialogComponent } from '../no-printer-dialog/no-printer-dialog.component';
import { PrintConfirmationDialogComponent } from '../print-confirmation-dialog/print-confirmation-dialog.component';






import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-order-info-modal',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    NgIf,
    
  ],
  templateUrl: './order-info-modal.component.html',
  styleUrls: ['./order-info-modal.component.scss']
})
export class OrderInfoModalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private printerService: PrinterService ,public dialog: MatDialog) {}
  onPrintCustomerCopy(): void {
    this.printDocument('customer');
  }

  onPrintDriverCopy(): void {
    this.printDocument('driver');
  }

  private printDocument(type: string): void {
    if (this.printerService.isPrinterAvailable()) {
      // Print the document
      this.dialog.open(PrintConfirmationDialogComponent);
    } else {
      this.dialog.open(NoPrinterDialogComponent);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result if needed
    });
  }

  displayedColumns: string[] = ['product', 'price', 'size', 'quantity', 'total', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
}

export interface PeriodicElement {
  product: any;
  price: string;
  size: string;
  quantity: string;
  total: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    product: {
      img: 'assets/images/recent-orders/recent-order1.jpg',
      title: 'Comforta Armchair',
      date: 'Dec 16, 08:30 PM'
    },
    price: '$14,000',
    size: 'M',
    quantity: '01 item',
    total: '$14,000',
    action: 'trash-2'
  },
  {
    product: {
      img: 'assets/images/recent-orders/recent-order2.jpg',
      title: 'Comforta Sofa EDM',
      date: 'Dec 15, 02:20 PM'
    },
    price: '$3,000',
    size: 'XL',
    quantity: '02 items',
    total: '$6,000',
    action: 'trash-2'
  },
  {
    product: {
      img: 'assets/images/recent-orders/recent-order3.jpg',
      title: 'Electric Bicycle',
      date: 'Dec 14, 10:00 AM'
    },
    price: '$450',
    size: 'Regular',
    quantity: '04 items',
    total: '$1,800',
    action: 'trash-2'
  },
  {
    product: {
      img: 'assets/images/recent-orders/recent-order4.jpg',
      title: 'Sport Shoes',
      date: 'Dec 13, 03:43 AM'
    },
    price: '$28,000',
    size: 'M',
    quantity: '03 items',
    total: '$84,000',
    action: 'trash-2'
  },
  {
    product: {
      img: 'assets/images/recent-orders/recent-order5.jpg',
      title: 'Straw Hat',
      date: 'Dec 12, 12:09 PM'
    },
    price: '$17,000',
    size: 'Regular',
    quantity: '01 item',
    total: '$17,000',
    action: 'trash-2'
  }
];
