import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

    displayedColumns: string[] = ['product', 'price'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    product: any;
    price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        product: {
            img: 'assets/images/recent-orders/recent-order1.jpg',
            title: 'Comforta Armchair',
            date: 'Dec 16, 08:30 PM'
        },
        price: '$14,000'
    },
    {
        product: {
            img: 'assets/images/recent-orders/recent-order2.jpg',
            title: 'Comforta Sofa EDM',
            date: 'Dec 15, 02:20 PM'
        },
        price: '$3,000'
    },
    {
        product: {
            img: 'assets/images/recent-orders/recent-order3.jpg',
            title: 'Electric Bicycle',
            date: 'Dec 14, 10:00 AM'
        },
        price: '$450'
    },
    {
        product: {
            img: 'assets/images/recent-orders/recent-order4.jpg',
            title: 'Sport Shoes',
            date: 'Dec 13, 03:43 AM'
        },
        price: '$28,000'
    },
    {
        product: {
            img: 'assets/images/recent-orders/recent-order5.jpg',
            title: 'Straw Hat',
            date: 'Dec 12, 12:09 PM'
        },
        price: '$17,000'
    }
];