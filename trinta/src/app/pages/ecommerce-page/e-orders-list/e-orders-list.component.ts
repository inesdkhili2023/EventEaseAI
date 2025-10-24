import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-e-orders-list',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './e-orders-list.component.html',
    styleUrl: './e-orders-list.component.scss'
})
export class EOrdersListComponent {

    displayedColumns: string[] = ['trackingID', 'product', 'customer', 'paymentStatus', 'price', 'quantity', 'vendor', 'status', 'action'];
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
    paymentStatus: any;
    price: string;
    quantity: string;
    vendor: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        trackingID: 'A3651',
        product: {
            img: 'assets/images/products/product15.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$14,000',
        quantity: '04 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3652',
        product: {
            img: 'assets/images/products/product16.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Isabella Anderson',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$3,000',
        quantity: '01 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3653',
        product: {
            img: 'assets/images/products/product17.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Mason Martinez',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$450',
        quantity: '08 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3654',
        product: {
            img: 'assets/images/products/product18.jpg',
            title: 'Sport Shoes',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Sophia Jones',
        paymentStatus: {
            // unpaid: 'Unpaid',
            // paid : 'Paid',
            awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$28,000',
        quantity: '06 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3655',
        product: {
            img: 'assets/images/products/product19.jpg',
            title: 'Straw Hat',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Thomas Moser',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$17,000',
        quantity: '12 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3656',
        product: {
            img: 'assets/images/products/product20.jpg',
            title: 'Sofa Sculpt',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$14,000',
        quantity: '03 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3657',
        product: {
            img: 'assets/images/products/product21.jpg',
            title: 'Urban Carry',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Isabella Anderson',
        paymentStatus: {
            // unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            failed : 'Failed',
        },
        price: '$3,000',
        quantity: '07 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            // delivered : 'Delivered',
            canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3658',
        product: {
            img: 'assets/images/products/product22.jpg',
            title: 'Elegance Steps',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Mason Martinez',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$450',
        quantity: '06 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3659',
        product: {
            img: 'assets/images/products/product23.jpg',
            title: 'Urban Chic Pants',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Sophia Jones',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$28,000',
        quantity: '04 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3660',
        product: {
            img: 'assets/images/products/product24.jpg',
            title: 'Moda Motion',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Thomas Moser',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$17,000',
        quantity: '01 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3660',
        product: {
            img: 'assets/images/products/product24.jpg',
            title: 'Moda Motion',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Thomas Moser',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$17,000',
        quantity: '01 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3659',
        product: {
            img: 'assets/images/products/product23.jpg',
            title: 'Urban Chic Pants',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Sophia Jones',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$28,000',
        quantity: '04 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3658',
        product: {
            img: 'assets/images/products/product22.jpg',
            title: 'Elegance Steps',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Mason Martinez',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$450',
        quantity: '06 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3657',
        product: {
            img: 'assets/images/products/product21.jpg',
            title: 'Urban Carry',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Isabella Anderson',
        paymentStatus: {
            // unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            failed : 'Failed',
        },
        price: '$3,000',
        quantity: '07 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            // delivered : 'Delivered',
            canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3656',
        product: {
            img: 'assets/images/products/product20.jpg',
            title: 'Sofa Sculpt',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$14,000',
        quantity: '03 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3655',
        product: {
            img: 'assets/images/products/product19.jpg',
            title: 'Straw Hat',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Thomas Moser',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$17,000',
        quantity: '12 items',
        vendor: 'Goldman',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3654',
        product: {
            img: 'assets/images/products/product18.jpg',
            title: 'Sport Shoes',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Sophia Jones',
        paymentStatus: {
            // unpaid: 'Unpaid',
            // paid : 'Paid',
            awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$28,000',
        quantity: '06 items',
        vendor: 'Northrop LTD',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3653',
        product: {
            img: 'assets/images/products/product17.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Mason Martinez',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$450',
        quantity: '08 items',
        vendor: 'Forv Motor',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3652',
        product: {
            img: 'assets/images/products/product16.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'Isabella Anderson',
        paymentStatus: {
            // unpaid: 'Unpaid',
            paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$3,000',
        quantity: '01 items',
        vendor: 'Novartix LTD',
        status: {
            // pending: 'Pending',
            delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingID: 'A3651',
        product: {
            img: 'assets/images/products/product15.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        customer: 'William White',
        paymentStatus: {
            unpaid: 'Unpaid',
            // paid : 'Paid',
            // awaiting : 'Awaiting',
            // failed : 'Failed',
        },
        price: '$14,000',
        quantity: '04 items',
        vendor: 'Jekob Fashion',
        status: {
            pending: 'Pending',
            // delivered : 'Delivered',
            // canceled : 'Canceled',
        },
        action: {
            view: 'ri-eye-line',
            delete : 'ri-delete-bin-line'
        }
    }
];