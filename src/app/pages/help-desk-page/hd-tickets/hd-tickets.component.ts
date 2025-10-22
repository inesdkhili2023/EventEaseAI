import { Component, ViewChild } from '@angular/core';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';
import { StatsComponent } from './stats/stats.component';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-hd-tickets',
    standalone: true,
    imports: [StatsComponent, SupportTicketsComponent, RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatPaginatorModule, MatTableModule, NgIf],
    templateUrl: './hd-tickets.component.html',
    styleUrl: './hd-tickets.component.scss'
})
export class HdTicketsComponent {

    displayedColumns: string[] = ['id', 'customer', 'subject', 'responseTime', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    id: string;
    customer: any;
    subject: string;
    responseTime: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: 'A3651',
        customer: {
            img: 'assets/images/users/user11.jpg',
            name: 'Oliver Jenkins',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'How Tailoring Experiences Can Enhance Customer Satisfaction and Loyalty.',
        responseTime: '14 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3652',
        customer: {
            img: 'assets/images/users/user12.jpg',
            name: 'Ava Reynolds',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Role of Technology in Transforming Customer Support to AI-driven Solutions.',
        responseTime: '17 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3653',
        customer: {
            img: 'assets/images/users/user13.jpg',
            name: 'Eleanor Anderson',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Building Trust through Transparent Communication in Customer Interactions.',
        responseTime: '23 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3654',
        customer: {
            img: 'assets/images/users/user14.jpg',
            name: 'Liam Parker',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Evolution of Customer Feedback: Harnessing Data to Drive Business.',
        responseTime: '43 mins',
        status: {
            // ongoing: 'Ongoing',
            pending : 'Pending'
        }
    },
    {
        id: 'A3655',
        customer: {
            img: 'assets/images/users/user15.jpg',
            name: 'Isabella Rodriguez',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Balancing Automation and Human Touch in Customer  Experience.',
        responseTime: '20 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3656',
        customer: {
            img: 'assets/images/users/user19.jpg',
            name: 'Lucas Martinez',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Cross-Cultural Considerations in Global Customer  Navigating  Customer Expectations.',
        responseTime: '12 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3657',
        customer: {
            img: 'assets/images/users/user17.jpg',
            name: 'Ethan Nguyen',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Power of Emotional Intelligence Enhancing Empathy and Connection.',
        responseTime: '10 mins',
        status: {
            // ongoing: 'Ongoing',
            pending : 'Pending'
        }
    },
    {
        id: 'A3657',
        customer: {
            img: 'assets/images/users/user17.jpg',
            name: 'Ethan Nguyen',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Power of Emotional Intelligence Enhancing Empathy and Connection.',
        responseTime: '10 mins',
        status: {
            // ongoing: 'Ongoing',
            pending : 'Pending'
        }
    },
    {
        id: 'A3656',
        customer: {
            img: 'assets/images/users/user19.jpg',
            name: 'Lucas Martinez',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Cross-Cultural Considerations in Global Customer  Navigating  Customer Expectations.',
        responseTime: '12 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3654',
        customer: {
            img: 'assets/images/users/user14.jpg',
            name: 'Liam Parker',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Evolution of Customer Feedback: Harnessing Data to Drive Business.',
        responseTime: '43 mins',
        status: {
            // ongoing: 'Ongoing',
            pending : 'Pending'
        }
    },
    {
        id: 'A3655',
        customer: {
            img: 'assets/images/users/user15.jpg',
            name: 'Isabella Rodriguez',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Balancing Automation and Human Touch in Customer  Experience.',
        responseTime: '20 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3653',
        customer: {
            img: 'assets/images/users/user13.jpg',
            name: 'Eleanor Anderson',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'Building Trust through Transparent Communication in Customer Interactions.',
        responseTime: '23 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3652',
        customer: {
            img: 'assets/images/users/user12.jpg',
            name: 'Ava Reynolds',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'The Role of Technology in Transforming Customer Support to AI-driven Solutions.',
        responseTime: '17 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    },
    {
        id: 'A3651',
        customer: {
            img: 'assets/images/users/user11.jpg',
            name: 'Oliver Jenkins',
            phoneNumber: '+03 4567 8900'
        },
        subject: 'How Tailoring Experiences Can Enhance Customer Satisfaction and Loyalty.',
        responseTime: '14 mins',
        status: {
            ongoing: 'Ongoing',
            // pending : 'Pending'
        }
    }
];