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
    selector: 'app-in-progress:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor, MatCheckboxModule, MatTooltipModule, MatProgressBarModule],
    templateUrl: './in-progress.component.html',
    styleUrl: './in-progress.component.scss'
})
export class InProgressComponent {

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
            title: 'Conduct User Acceptance Testing',
            assigned: '08 Mar 2024',
        },
        completion: 7,
        budget: '$68k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user4.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user5.jpg'
            }
        ],
        dueDate: '09 Mar 2024',
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
            assigned: '07 Mar 2024',
        },
        completion: 63,
        budget: '$100.5k',
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
            title: 'Design The Product UI/UX',
            assigned: '10 Mar 2024',
        },
        completion: 15,
        budget: '$120k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user9.jpg'
            }
        ],
        dueDate: '11 Mar 2024',
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
            title: 'Cloud Solutions Architect',
            assigned: '14 Mar 2024',
        },
        completion: 40,
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user21.jpg'
            }
        ],
        dueDate: '15 Mar 2024',
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
            assigned: '11 Mar 2024',
        },
        completion: 40,
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user12.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user13.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user14.jpg'
            }
        ],
        dueDate: '12 Mar 2024',
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
            title: 'Customer Support Representative',
            assigned: '13 Mar 2024',
        },
        completion: 15,
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
            title: 'Cloud Solutions Architect',
            assigned: '14 Mar 2024',
        },
        completion: 40,
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user21.jpg'
            }
        ],
        dueDate: '15 Mar 2024',
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
            title: 'Customer Support Representative',
            assigned: '13 Mar 2024',
        },
        completion: 15,
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
            title: 'Launch And Promote The App',
            assigned: '11 Mar 2024',
        },
        completion: 40,
        budget: '$10.5k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user12.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user13.jpg'
            },
            {
                name: 'William Anderson',
                img: 'assets/images/users/user14.jpg'
            }
        ],
        dueDate: '12 Mar 2024',
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
            title: 'Design The Product UI/UX',
            assigned: '10 Mar 2024',
        },
        completion: 15,
        budget: '$120k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user9.jpg'
            }
        ],
        dueDate: '11 Mar 2024',
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
            assigned: '08 Mar 2024',
        },
        completion: 7,
        budget: '$68k',
        members: [
            {
                name: 'Charlotte Lee',
                img: 'assets/images/users/user4.jpg'
            },
            {
                name: 'Benjamin Clark',
                img: 'assets/images/users/user5.jpg'
            }
        ],
        dueDate: '09 Mar 2024',
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
            assigned: '07 Mar 2024',
        },
        completion: 63,
        budget: '$100.5k',
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