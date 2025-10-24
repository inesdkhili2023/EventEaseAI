import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-recent-orders',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './recent-orders.component.html',
    styleUrl: './recent-orders.component.scss'
})
export class RecentOrdersComponent {

    displayedColumns: string[] = ['trackingID', 'product', 'customer', 'price', 'quantity', 'vendor', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    trackingID: string;
    product: any;
    customer: string;
    price: string;
    quantity: string;
    vendor: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        trackingID: 'A3651',
        product: {
            img: 'assets/images/recent-orders/recent-order1.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        price: '$14,000',
        quantity: '04 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3652',
        product: {
            img: 'assets/images/recent-orders/recent-order2.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 15, 02:20 PM'
        },
        customer: 'Isabella Anderson',
        price: '$3,000',
        quantity: '02 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3653',
        product: {
            img: 'assets/images/recent-orders/recent-order3.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 14, 10:00 AM'
        },
        customer: 'Mason Martinez',
        price: '$450',
        quantity: '05 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3654',
        product: {
            img: 'assets/images/recent-orders/recent-order4.jpg',
            title: 'Sport Shoes',
            date: 'Dec 13, 03:43 AM'
        },
        customer: 'Sophia Jones',
        price: '$28,000',
        quantity: '03 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3655',
        product: {
            img: 'assets/images/recent-orders/recent-order5.jpg',
            title: 'Straw Hat',
            date: 'Dec 12, 12:09 PM'
        },
        customer: 'Thomas Moser',
        price: '$17,000',
        quantity: '02 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3655',
        product: {
            img: 'assets/images/recent-orders/recent-order5.jpg',
            title: 'Straw Hat',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Thomas Moser',
        price: '$17,000',
        quantity: '02 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3653',
        product: {
            img: 'assets/images/recent-orders/recent-order3.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Mason Martinez',
        price: '$450',
        quantity: '05 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3654',
        product: {
            img: 'assets/images/recent-orders/recent-order4.jpg',
            title: 'Sport Shoes',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Sophia Jones',
        price: '$28,000',
        quantity: '03 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3652',
        product: {
            img: 'assets/images/recent-orders/recent-order2.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Isabella Anderson',
        price: '$3,000',
        quantity: '02 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered'
        }
    },
    {
        trackingID: 'A3651',
        product: {
            img: 'assets/images/recent-orders/recent-order1.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        price: '$14,000',
        quantity: '04 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered'
        }
    }
];