import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-to-do-list:not(2)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, MatCheckboxModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

    displayedColumns: string[] = ['taskName', 'status', 'assignedTo', 'deadline', 'priority', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

export interface PeriodicElement {
    taskName: string;
    assignedTo: string;
    deadline: string;
    priority: string;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        taskName: 'Create A New React app',
        assignedTo: 'Alexander White',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Integrate Component Into App.js',
        assignedTo: 'Emma Anderson',
        deadline: 'Due in 4 days',
        status: {
            // active: 'Active',
            onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Start The Development Server',
        assignedTo: 'Noah Taylor',
        deadline: 'Due in 1 day',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Perform Unit Testing',
        assignedTo: 'Sophia Williams',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Counter Component Into App.js',
        assignedTo: 'Sophia Williams',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Create A TodoList Component',
        assignedTo: 'Noah Taylor',
        deadline: 'Due in 1 day',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Data Fetcher Component Into App.js',
        assignedTo: 'Emma Anderson',
        deadline: 'Due in 4 days',
        status: {
            // active: 'Active',
            onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Test The Todo List',
        assignedTo: 'Alexander White',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Start The Development Server',
        assignedTo: 'Olivia Smith',
        deadline: 'Due in 2 days',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Start The Development Server',
        assignedTo: 'Olivia Smith',
        deadline: 'Due in 2 days',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Test The Todo List',
        assignedTo: 'Alexander White',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Data Fetcher Component Into App.js',
        assignedTo: 'Emma Anderson',
        deadline: 'Due in 4 days',
        status: {
            // active: 'Active',
            onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Create A TodoList Component',
        assignedTo: 'Noah Taylor',
        deadline: 'Due in 1 day',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Counter Component Into App.js',
        assignedTo: 'Sophia Williams',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Perform Unit Testing',
        assignedTo: 'Sophia Williams',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Start The Development Server',
        assignedTo: 'Noah Taylor',
        deadline: 'Due in 1 day',
        status: {
            // active: 'Active',
            // onHand : 'On Hand'
            urgent : 'Urgent'
        },
        priority: 'High',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Integrate Component Into App.js',
        assignedTo: 'Emma Anderson',
        deadline: 'Due in 4 days',
        status: {
            // active: 'Active',
            onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Medium',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        taskName: 'Create A New React app',
        assignedTo: 'Alexander White',
        deadline: 'Due in 3 days',
        status: {
            active: 'Active',
            // onHand : 'On Hand'
            // urgent : 'Urgent'
        },
        priority: 'Low',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];