import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-students-progress',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatProgressBarModule],
    templateUrl: './students-progress.component.html',
    styleUrl: './students-progress.component.scss'
})
export class StudentsProgressComponent {

    displayedColumns: string[] = ['course'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    course: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        course: {
            img: 'assets/images/users/user16.jpg',
            name: 'Jordan Stevenson',
            progressPercentage: 70,
            courseName: 'Informatic Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user17.jpg',
            name: 'Benjamin Foster',
            progressPercentage: 30,
            courseName: 'Digital Marketing Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user8.jpg',
            name: 'Emma Reynolds',
            progressPercentage: 55,
            courseName: 'Informatic Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user18.jpg',
            name: 'Isabella Davis',
            progressPercentage: 40,
            courseName: 'Informatic Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user18.jpg',
            name: 'Isabella Davis',
            progressPercentage: 40,
            courseName: 'Informatic Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user8.jpg',
            name: 'Emma Reynolds',
            progressPercentage: 55,
            courseName: 'Informatic Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user17.jpg',
            name: 'Benjamin Foster',
            progressPercentage: 30,
            courseName: 'Digital Marketing Course',
        }
    },
    {
        course: {
            img: 'assets/images/users/user16.jpg',
            name: 'Jordan Stevenson',
            progressPercentage: 70,
            courseName: 'Informatic Course',
        }
    }
];