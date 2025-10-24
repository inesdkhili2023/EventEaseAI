import { RouterLink } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-earnings-reports',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule],
    templateUrl: './earnings-reports.component.html',
    styleUrl: './earnings-reports.component.scss'
})
export class EarningsReportsComponent {

    displayedColumns: string[] = ['date', 'itemCount', 'earnings'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    date: string;
    itemCount: number;
    earnings: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        date: '01 January',
        itemCount: 145,
        earnings: '$8,000'
    },
    {
        date: '02 February',
        itemCount: 72,
        earnings: '$19,000'
    },
    {
        date: '03 March',
        itemCount: 532,
        earnings: '$2,000'
    },
    {
        date: '04 April',
        itemCount: 158,
        earnings: '$32,000'
    },
    {
        date: '05 May',
        itemCount: 91,
        earnings: '$10,000'
    },
    {
        date: '06 June',
        itemCount: 68,
        earnings: '$14,000'
    },
    {
        date: '07 July',
        itemCount: 21,
        earnings: '$12,312'
    },
    {
        date: '08 August',
        itemCount: 91,
        earnings: '$10,000'
    },
    {
        date: '09 September',
        itemCount: 158,
        earnings: '$32,000'
    },
    {
        date: '10 October',
        itemCount: 532,
        earnings: '$2,000'
    },
    {
        date: '11 November',
        itemCount: 72,
        earnings: '$19,000'
    },
    {
        date: '12 December',
        itemCount: 145,
        earnings: '$8,000'
    },
    {
        date: '13 January',
        itemCount: 72,
        earnings: '$19,000'
    },
    {
        date: '14 February',
        itemCount: 145,
        earnings: '$8,000'
    }
];