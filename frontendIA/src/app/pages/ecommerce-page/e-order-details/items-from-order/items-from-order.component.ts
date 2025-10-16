import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-items-from-order',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule],
    templateUrl: './items-from-order.component.html',
    styleUrl: './items-from-order.component.scss'
})
export class ItemsFromOrderComponent {

    displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    product: any;
    quantity: string;
    price: string;
    total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        product: {
            img: 'assets/images/products/product15.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '01 item',
        price: '$14,000',
        total: '$14,000'
    },
    {
        product: {
            img: 'assets/images/products/product16.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '03 items',
        price: '$3,000',
        total: '$9,000'
    },
    {
        product: {
            img: 'assets/images/products/product17.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '02 items',
        price: '$450',
        total: '$900'
    },
    {
        product: {
            img: 'assets/images/products/product18.jpg',
            title: 'Sport Shoes',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '01 item',
        price: '$28,000',
        total: '$28,000'
    }
];