import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-outlets-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatTableModule],
    templateUrl: './outlets-details.component.html',
    styleUrl: './outlets-details.component.scss'
})
export class OutletsDetailsComponent {

    displayedColumns: string[] = ['outlets', 'totalOrders', 'price', 'stock', 'revenue'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    outlets: string;
    totalOrders: string;
    price: string;
    stock: number;
    revenue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        outlets: 'Outlet_name1',
        totalOrders: '1,246',
        price: '$140.00',
        stock: 46,
        revenue: '$87,245'
    },
    {
        outlets: 'Outlet_name2',
        totalOrders: '809',
        price: '$140.00',
        stock: 46,
        revenue: '$87,245'
    },
    {
        outlets: 'Outlet_name3',
        totalOrders: '14,025',
        price: '$140.00',
        stock: 46,
        revenue: '$87,245'
    },
    {
        outlets: 'Outlet_name4',
        totalOrders: '1,209',
        price: '$140.00',
        stock: 46,
        revenue: '$87,245'
    },
    {
        outlets: 'Outlet_name5',
        totalOrders: '603',
        price: '$140.00',
        stock: 46,
        revenue: '$87,245'
    }
];