import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-e-cart',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, NgIf, FeathericonsModule],
    templateUrl: './e-cart.component.html',
    styleUrl: './e-cart.component.scss'
})
export class ECartComponent {

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