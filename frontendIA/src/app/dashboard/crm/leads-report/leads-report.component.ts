import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-leads-report',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf],
    templateUrl: './leads-report.component.html',
    styleUrl: './leads-report.component.scss'
})
export class LeadsReportComponent {

    displayedColumns: string[] = ['user', 'email', 'dealValue', 'company', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    user: any;
    email: string;
    dealValue: string;
    company: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        user: {
            img: 'assets/images/users/user1.jpg',
            name: 'Sarah Rodriguez',
            number: '+03 4567 8900'
        },
        email: 'rodriguez@trinta.com',
        dealValue: '$100.5k',
        company: 'Aurora Skies',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user2.jpg',
            name: 'Marcus Davis',
            number: '+03 4567 8900'
        },
        email: 'davis@trinta.com',
        dealValue: '$75k',
        company: 'Nexa Technologies',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user3.jpg',
            name: 'Emily Johnson',
            number: '+03 4567 8900'
        },
        email: 'johnson@trinta.com',
        dealValue: '$40k',
        company: 'Crimson Horizon',
        status: {
            // new: 'New Lead',
            lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user9.jpg',
            name: 'William Anderson',
            number: '+03 4567 8900'
        },
        email: 'anderson@trinta.com',
        dealValue: '$90k',
        company: 'Leaf Solutions',
        status: {
            // new: 'New Lead',
            // lost : 'Lost'
            converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user10.jpg',
            name: 'Charlotte Lee',
            number: '+03 4567 8900'
        },
        email: 'lee@trinta.com',
        dealValue: '$120.5k',
        company: 'Celestial Dynamics',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user10.jpg',
            name: 'Charlotte Lee',
            number: '+03 4567 8900'
        },
        email: 'lee@trinta.com',
        dealValue: '$120.5k',
        company: 'Celestial Dynamics',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user3.jpg',
            name: 'Emily Johnson',
            number: '+03 4567 8900'
        },
        email: 'johnson@trinta.com',
        dealValue: '$40k',
        company: 'Crimson Horizon',
        status: {
            // new: 'New Lead',
            lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user9.jpg',
            name: 'William Anderson',
            number: '+03 4567 8900'
        },
        email: 'anderson@trinta.com',
        dealValue: '$90k',
        company: 'Leaf Solutions',
        status: {
            // new: 'New Lead',
            // lost : 'Lost'
            converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user2.jpg',
            name: 'Marcus Davis',
            number: '+03 4567 8900'
        },
        email: 'davis@trinta.com',
        dealValue: '$75k',
        company: 'Nexa Technologies',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        user: {
            img: 'assets/images/users/user1.jpg',
            name: 'Sarah Rodriguez',
            number: '+03 4567 8900'
        },
        email: 'rodriguez@trinta.com',
        dealValue: '$100.5k',
        company: 'Aurora Skies',
        status: {
            new: 'New Lead',
            // lost : 'Lost'
            // converted : 'Converted'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];