import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-invoices',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

    displayedColumns: string[] = ['trackingNo', 'client', 'issuesDate', 'amount', 'projects', 'balance', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    trackingNo: string;
    client: any;
    issuesDate: string;
    amount: string;
    projects: number;
    balance: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        trackingNo: 'A3651',
        client: {
            img: 'assets/images/users/user1.jpg',
            name: 'Sarah Rodriguez',
            cardName: 'Master Card'
        },
        issuesDate: '16 Jul, 2024',
        amount: '$12,054',
        projects: 805,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3652',
        client: {
            img: 'assets/images/users/user2.jpg',
            name: 'Marcus Davis',
            cardName: 'American EX.'
        },
        issuesDate: '17 Jul, 2024',
        amount: '$11,432',
        projects: 324,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3653',
        client: {
            img: 'assets/images/users/user3.jpg',
            name: 'Emily Johnson',
            cardName: 'Visa Card'
        },
        issuesDate: '18 Jul, 2024',
        amount: '$431',
        projects: 902,
        balance: {
            // paid: 'Paid',
            due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3654',
        client: {
            img: 'assets/images/users/user9.jpg',
            name: 'William Anderson',
            cardName: 'Visa Card'
        },
        issuesDate: '19 Jul, 2024',
        amount: '$3,432',
        projects: 519,
        balance: {
            // paid: 'Paid',
            // due : '$250 Due',
            waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3655',
        client: {
            img: 'assets/images/users/user10.jpg',
            name: 'Charlotte Lee',
            cardName: 'Master Card'
        },
        issuesDate: '20 Jul, 2024',
        amount: '$1,104',
        projects: 227,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3656',
        client: {
            img: 'assets/images/users/user6.jpg',
            name: 'David Warner',
            cardName: 'Master Card'
        },
        issuesDate: '21 Jul, 2024',
        amount: '$435',
        projects: 458,
        balance: {
            // paid: 'Paid',
            due : '$170 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3657',
        client: {
            img: 'assets/images/users/user8.jpg',
            name: 'Alina Smith',
            cardName: 'American EX.'
        },
        issuesDate: '22 Jul, 2024',
        amount: '$642',
        projects: 1205,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3658',
        client: {
            img: 'assets/images/users/user4.jpg',
            name: 'Steven Jones',
            cardName: 'Visa Card'
        },
        issuesDate: '23 Jul, 2024',
        amount: '$1,092',
        projects: 104,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3659',
        client: {
            img: 'assets/images/users/user5.jpg',
            name: 'Olivia Lucy',
            cardName: 'American EX.'
        },
        issuesDate: '24 Jul, 2024',
        amount: '$621',
        projects: 351,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3659',
        client: {
            img: 'assets/images/users/user5.jpg',
            name: 'Olivia Lucy',
            cardName: 'American EX.'
        },
        issuesDate: '24 Jul, 2024',
        amount: '$621',
        projects: 351,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3658',
        client: {
            img: 'assets/images/users/user4.jpg',
            name: 'Steven Jones',
            cardName: 'Visa Card'
        },
        issuesDate: '23 Jul, 2024',
        amount: '$1,092',
        projects: 104,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3657',
        client: {
            img: 'assets/images/users/user8.jpg',
            name: 'Alina Smith',
            cardName: 'American EX.'
        },
        issuesDate: '22 Jul, 2024',
        amount: '$642',
        projects: 1205,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3656',
        client: {
            img: 'assets/images/users/user6.jpg',
            name: 'David Warner',
            cardName: 'Master Card'
        },
        issuesDate: '21 Jul, 2024',
        amount: '$435',
        projects: 458,
        balance: {
            // paid: 'Paid',
            due : '$170 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3655',
        client: {
            img: 'assets/images/users/user10.jpg',
            name: 'Charlotte Lee',
            cardName: 'Master Card'
        },
        issuesDate: '20 Jul, 2024',
        amount: '$1,104',
        projects: 227,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3654',
        client: {
            img: 'assets/images/users/user9.jpg',
            name: 'William Anderson',
            cardName: 'Visa Card'
        },
        issuesDate: '19 Jul, 2024',
        amount: '$3,432',
        projects: 519,
        balance: {
            // paid: 'Paid',
            // due : '$250 Due',
            waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3653',
        client: {
            img: 'assets/images/users/user3.jpg',
            name: 'Emily Johnson',
            cardName: 'Visa Card'
        },
        issuesDate: '18 Jul, 2024',
        amount: '$431',
        projects: 902,
        balance: {
            // paid: 'Paid',
            due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3652',
        client: {
            img: 'assets/images/users/user2.jpg',
            name: 'Marcus Davis',
            cardName: 'American EX.'
        },
        issuesDate: '17 Jul, 2024',
        amount: '$11,432',
        projects: 324,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        trackingNo: 'A3651',
        client: {
            img: 'assets/images/users/user1.jpg',
            name: 'Sarah Rodriguez',
            cardName: 'Master Card'
        },
        issuesDate: '16 Jul, 2024',
        amount: '$12,054',
        projects: 805,
        balance: {
            paid: 'Paid',
            // due : '$250 Due',
            // waiting : 'Waiting To Receive'
        },
        action: {
            download: 'ri-download-2-line',
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];