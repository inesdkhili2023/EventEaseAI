import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-completed',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule, MatProgressBarModule],
    templateUrl: './completed.component.html',
    styleUrl: './completed.component.scss'
})
export class CompletedComponent {

    displayedColumns: string[] = ['project', 'completion', 'budget', 'members', 'status', 'dueDate', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    project: any;
    completion: number;
    budget: string;
    members: any;
    dueDate: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        project: {
            title: 'Optimize App Performance',
            assigned: '09 Mar 2024',
        },
        completion: 100,
        budget: '$90.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user6.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user7.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user8.jpg'
            }
        ],
        dueDate: '10 Mar 2024',
        status: {
            // active: 'Active',
            // pending : 'Pending'
            completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Cybersecurity Analyst',
            assigned: '12 Mar 2024',
        },
        completion: 100,
        budget: '$90.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user15.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user16.jpg'
            }
        ],
        dueDate: '13 Mar 2024',
        status: {
            // active: 'Active',
            // pending : 'Pending'
            completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Customer Support Representative',
            assigned: '13 Mar 2024',
        },
        completion: 100,
        budget: '$120k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user18.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user19.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user20.jpg'
            }
        ],
        dueDate: '14 Mar 2024',
        status: {
            // active: 'Active',
            // pending : 'Pending'
            completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Cloud Solutions Architect',
            assigned: '14 Mar 2024',
        },
        completion: 100,
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user21.jpg'
            }
        ],
        dueDate: '15 Mar 2024',
        status: {
            // active: 'Active',
            // pending : 'Pending'
            completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];