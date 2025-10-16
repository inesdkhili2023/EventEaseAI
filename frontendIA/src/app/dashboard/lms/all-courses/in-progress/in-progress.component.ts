import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-in-progress',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './in-progress.component.html',
    styleUrl: './in-progress.component.scss'
})
export class InProgressComponent {

    displayedColumns: string[] = ['course', 'result', 'instructor', 'students', 'lessons', 'startDate', 'endDate', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    course: any;
    instructor: string;
    result: number;
    students: number;
    lessons: number;
    startDate: string;
    endDate: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        course: {
            img: 'assets/images/courses/course5.jpg',
            title: 'Express.js & MongoDB',
            hours: '08:56:00'
        },
        result: 100,
        instructor: 'Olivia Bennett',
        students: 152,
        lessons: 44,
        startDate: '2023-12-19',
        endDate: '2024-04-20',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course3.jpg',
            title: 'IT Certifications',
            hours: '06:50:10'
        },
        result: 65,
        instructor: 'Emma Reynolds',
        students: 350,
        lessons: 120,
        startDate: '2023-11-25',
        endDate: '2024-01-29',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course4.jpg',
            title: 'Visual Arts & Science',
            hours: '07:56:15'
        },
        result: 50,
        instructor: 'Noah Wilson',
        students: 68,
        lessons: 120,
        startDate: '2023-08-10',
        endDate: '2024-04-26',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course2.jpg',
            title: 'Finance & Accounting',
            hours: '12:30:15'
        },
        result: 40,
        instructor: 'Liam Sullivan',
        students: 241,
        lessons: 58,
        startDate: '2023-11-20',
        endDate: '2024-02-21',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course1.jpg',
            title: 'Programming Language',
            hours: '08:56:00'
        },
        result: 80,
        instructor: 'Olivia Bennett',
        students: 152,
        lessons: 44,
        startDate: '2023-10-11',
        endDate: '2024-03-10',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course1.jpg',
            title: 'Programming Language',
            hours: '08:56:00'
        },
        result: 80,
        instructor: 'Olivia Bennett',
        students: 152,
        lessons: 44,
        startDate: '2023-10-11',
        endDate: '2024-03-10',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course2.jpg',
            title: 'Finance & Accounting',
            hours: '12:30:15'
        },
        result: 40,
        instructor: 'Liam Sullivan',
        students: 241,
        lessons: 58,
        startDate: '2023-11-20',
        endDate: '2024-02-21',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course3.jpg',
            title: 'IT Certifications',
            hours: '06:50:10'
        },
        result: 65,
        instructor: 'Emma Reynolds',
        students: 350,
        lessons: 120,
        startDate: '2023-11-25',
        endDate: '2024-01-29',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course4.jpg',
            title: 'Visual Arts & Science',
            hours: '07:56:15'
        },
        result: 50,
        instructor: 'Noah Wilson',
        students: 68,
        lessons: 120,
        startDate: '2023-08-10',
        endDate: '2024-04-26',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        course: {
            img: 'assets/images/courses/course5.jpg',
            title: 'Express.js & MongoDB',
            hours: '08:56:00'
        },
        result: 100,
        instructor: 'Olivia Bennett',
        students: 152,
        lessons: 44,
        startDate: '2023-12-19',
        endDate: '2024-04-20',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];