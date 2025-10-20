import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-transactions-history',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule],
    templateUrl: './transactions-history.component.html',
    styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {

    displayedColumns: string[] = ['user', 'id', 'createdDate'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    user: any;
    id: string;
    createdDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        user: {
            img: 'assets/images/users/user4.jpg',
            name: 'Benjamin Clark'
        },
        id: 'A3655',
        createdDate: 'Dec 17, 08:30 PM'
    },
    {
        user: {
            img: 'assets/images/users/user5.jpg',
            name: 'Charlotte Lee'
        },
        id: 'A3656',
        createdDate: 'Dec 18, 07:11 AM'
    },
    {
        user: {
            img: 'assets/images/users/user6.jpg',
            name: 'James Walker'
        },
        id: 'A3657',
        createdDate: 'Dec 21, 12:00 PM'
    },
    {
        user: {
            img: 'assets/images/users/user7.jpg',
            name: 'Amelia Rodriguez'
        },
        id: 'A3658',
        createdDate: 'Dec 24, 01:21 AM'
    },
    {
        user: {
            img: 'assets/images/users/user8.jpg',
            name: 'Mia Garcia'
        },
        id: 'A2459',
        createdDate: 'Dec 26, 05:30 PM'
    },
    {
        user: {
            img: 'assets/images/users/user8.jpg',
            name: 'Mia Garcia'
        },
        id: 'A2459',
        createdDate: 'Dec 26, 05:30 PM'
    },
    {
        user: {
            img: 'assets/images/users/user7.jpg',
            name: 'Amelia Rodriguez'
        },
        id: 'A3658',
        createdDate: 'Dec 24, 01:21 AM'
    },
    {
        user: {
            img: 'assets/images/users/user6.jpg',
            name: 'James Walker'
        },
        id: 'A3657',
        createdDate: 'Dec 21, 12:00 PM'
    },
    {
        user: {
            img: 'assets/images/users/user5.jpg',
            name: 'Charlotte Lee'
        },
        id: 'A3656',
        createdDate: 'Dec 18, 07:11 AM'
    },
    {
        user: {
            img: 'assets/images/users/user4.jpg',
            name: 'Benjamin Clark'
        },
        id: 'A3655',
        createdDate: 'Dec 17, 08:30 PM'
    }
];