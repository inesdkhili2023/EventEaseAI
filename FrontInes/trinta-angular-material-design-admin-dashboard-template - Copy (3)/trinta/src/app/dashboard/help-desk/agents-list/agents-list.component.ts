import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-agents-list',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf, NgFor],
    templateUrl: './agents-list.component.html',
    styleUrl: './agents-list.component.scss'
})
export class AgentsListComponent {

    displayedColumns: string[] = ['agent', 'ratings', 'totalCalls', 'callAnswered', 'timeSpent', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    agent: any;
    ratings: any;
    totalCalls: number;
    callAnswered: number;
    timeSpent: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        agent: {
            img: 'assets/images/users/user11.jpg',
            name: 'Oliver Jenkins',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-half-fill'
            }
        ],
        totalCalls: 290,
        callAnswered: 288,
        timeSpent: '11 Hrs 25 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user12.jpg',
            name: 'Ava Reynolds',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 640,
        callAnswered: 509,
        timeSpent: '15 Hrs 30 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user13.jpg',
            name: 'Eleanor Anderson',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-half-fill'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 415,
        callAnswered: 372,
        timeSpent: '13 Hrs 58 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user14.jpg',
            name: 'Liam Parker',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-line'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 507,
        callAnswered: 447,
        timeSpent: '14 Hrs 54 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user15.jpg',
            name: 'Isabella Rodriguez',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            }
        ],
        totalCalls: 240,
        callAnswered: 215,
        timeSpent: '5 Hrs 40 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user15.jpg',
            name: 'Isabella Rodriguez',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            }
        ],
        totalCalls: 240,
        callAnswered: 215,
        timeSpent: '5 Hrs 40 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user13.jpg',
            name: 'Eleanor Anderson',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-half-fill'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 415,
        callAnswered: 372,
        timeSpent: '13 Hrs 58 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user14.jpg',
            name: 'Liam Parker',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-line'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 507,
        callAnswered: 447,
        timeSpent: '14 Hrs 54 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user12.jpg',
            name: 'Ava Reynolds',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-line'
            }
        ],
        totalCalls: 640,
        callAnswered: 509,
        timeSpent: '15 Hrs 30 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        agent: {
            img: 'assets/images/users/user11.jpg',
            name: 'Oliver Jenkins',
            number: '+03 4567 8900'
        },
        ratings: [
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-fill'
            },
            {
                star: 'ri-star-half-fill'
            }
        ],
        totalCalls: 290,
        callAnswered: 288,
        timeSpent: '11 Hrs 25 Mins',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];