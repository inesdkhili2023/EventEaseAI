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

@Component({
    selector: 'app-t-all-projects',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule],
    templateUrl: './t-all-projects.component.html',
    styleUrl: './t-all-projects.component.scss'
})
export class TAllProjectsComponent {

    displayedColumns: string[] = ['project', 'budget', 'members', 'status', 'dueDate', 'action'];
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
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        project: {
            title: 'Deploy The App To App Stores',
            percentage: '63'
        },
        budget: '$100.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user5.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user10.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user4.jpg'
            }
        ],
        dueDate: '08 Mar 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Conduct User Acceptance Testing',
            percentage: '7'
        },
        budget: '$68k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user16.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user14.jpg'
            }
        ],
        dueDate: '12 Mar 2024',
        status: {
            // active: 'Active',
            pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Optimize App Performance',
            percentage: '100'
        },
        budget: '$90.5k',
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
                img: 'assets/images/users/user13.jpg'
            }
        ],
        dueDate: '25 Mar 2024',
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
            title: 'Design The Product UI/UX',
            percentage: '15'
        },
        budget: '$120k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user9.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user10.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user11.jpg'
            }
        ],
        dueDate: '06 Apr 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Launch And Promote The App',
            percentage: '40'
        },
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user3.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user4.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user5.jpg'
            }
        ],
        dueDate: '28 Apr 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Launch And Promote The App',
            percentage: '40'
        },
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user3.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user4.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user5.jpg'
            }
        ],
        dueDate: '28 Apr 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Optimize App Performance',
            percentage: '100'
        },
        budget: '$90.5k',
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
                img: 'assets/images/users/user13.jpg'
            }
        ],
        dueDate: '25 Mar 2024',
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
            title: 'Design The Product UI/UX',
            percentage: '15'
        },
        budget: '$120k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user9.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user10.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user11.jpg'
            }
        ],
        dueDate: '06 Apr 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Conduct User Acceptance Testing',
            percentage: '7'
        },
        budget: '$68k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user16.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user14.jpg'
            }
        ],
        dueDate: '12 Mar 2024',
        status: {
            // active: 'Active',
            pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        project: {
            title: 'Deploy The App To App Stores',
            percentage: '63'
        },
        budget: '$100.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user5.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user10.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user4.jpg'
            }
        ],
        dueDate: '08 Mar 2024',
        status: {
            active: 'Active',
            // pending : 'Pending'
            // completed : 'Completed'
        },
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];