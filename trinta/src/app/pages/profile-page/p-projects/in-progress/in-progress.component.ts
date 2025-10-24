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
    selector: 'app-in-progress:not(2)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule, MatProgressBarModule],
    templateUrl: './in-progress.component.html',
    styleUrl: './in-progress.component.scss'
})
export class InProgressComponent {

    displayedColumns: string[] = ['project','idtoken', 'completion', 'members',  'status', 'budget', 'dueDate','driver','outat','dueamount', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    project: any;
    
    budget: string;
    members: any;
    dueDate: string;
    status: any;
    action: any;
    driver:string;
    outat:string;
    dueamount:string;
    idtoken:any;
}

export const ELEMENT_DATA: PeriodicElement[] = [
    {
        project: {
            title: 'Deploy The App To App Stores',
            assigned: '07 Mar 2024',
        },
        idtoken: 'ABC123',
        
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user1.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user2.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user3.jpg'
            }
        ],
        status: {
            active: 'Active',
        },
        budget: '$100.5k',
        dueDate: '08 Mar 2024',
        driver: 'John Doe',
        outat: '10:00 AM',
        dueamount: '$50.2k',
        action: {
            edit: 'ri-edit-line',
            delete: 'ri-delete-bin-line'
        }
    }
];