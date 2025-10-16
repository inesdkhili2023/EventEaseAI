import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-payment-history',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule],
    templateUrl: './payment-history.component.html',
    styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent {

    displayedColumns: string[] = ['card', 'date', 'amount', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    card: any;
    date: string;
    amount: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        card: {
            cardImg: 'assets/images/icons/paypal.svg',
            cardNumber: '00***99',
            cardType: 'Master Card'
        },
        date: '16 Jun, 2024',
        amount: '$12,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/skrill.svg',
            cardNumber: '11***22',
            cardType: 'American EX.'
        },
        date: '28 Jun, 2024',
        amount: '$5,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/visa.svg',
            cardNumber: '33***44',
            cardType: 'Visa Card'
        },
        date: '26 Jun, 2024',
        amount: '$25,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/wire.svg',
            cardNumber: '55***66',
            cardType: 'Visa Card'
        },
        date: '17 Jun, 2024',
        amount: '$8,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/mastercard.svg',
            cardNumber: '77***88',
            cardType: 'Master Card'
        },
        date: '16 Jul, 2024',
        amount: '$11,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/mastercard.svg',
            cardNumber: '77***88',
            cardType: 'Master Card'
        },
        date: '16 Jul, 2024',
        amount: '$11,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/visa.svg',
            cardNumber: '33***44',
            cardType: 'Visa Card'
        },
        date: '26 Jun, 2024',
        amount: '$25,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/wire.svg',
            cardNumber: '55***66',
            cardType: 'Visa Card'
        },
        date: '17 Jun, 2024',
        amount: '$8,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/skrill.svg',
            cardNumber: '11***22',
            cardType: 'American EX.'
        },
        date: '28 Jun, 2024',
        amount: '$5,000',
        action: {
            download: 'ri-download-2-line'
        }
    },
    {
        card: {
            cardImg: 'assets/images/icons/paypal.svg',
            cardNumber: '00***99',
            cardType: 'Master Card'
        },
        date: '16 Jun, 2024',
        amount: '$12,000',
        action: {
            download: 'ri-download-2-line'
        }
    }
];