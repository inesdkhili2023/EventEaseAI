import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-t-top-instructors',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule],
    templateUrl: './t-top-instructors.component.html',
    styleUrl: './t-top-instructors.component.scss'
})
export class TTopInstructorsComponent {

    displayedColumns: string[] = ['instructor', 'ratings', 'designation'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    instructor: any;
    ratings: any;
    designation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        instructor: {
            img: 'assets/images/users/user4.jpg',
            name: 'Benjamin Clark'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill'
        },
        designation: 'Physics Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user5.jpg',
            name: 'Charlotte Lee'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line'
        },
        designation: 'Math Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user6.jpg',
            name: 'James Walker'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line'
        },
        designation: 'Science Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user7.jpg',
            name: 'Amelia Rodriguez'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-line',
            star5: 'ri-star-line'
        },
        designation: 'Physics Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user8.jpg',
            name: 'Mia Garcia'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-fill'
        },
        designation: 'Chemistry  Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user8.jpg',
            name: 'Mia Garcia'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-fill'
        },
        designation: 'Chemistry  Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user7.jpg',
            name: 'Amelia Rodriguez'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-line',
            star5: 'ri-star-line'
        },
        designation: 'Physics Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user6.jpg',
            name: 'James Walker'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line'
        },
        designation: 'Science Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user5.jpg',
            name: 'Charlotte Lee'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-line'
        },
        designation: 'Math Instructor'
    },
    {
        instructor: {
            img: 'assets/images/users/user4.jpg',
            name: 'Benjamin Clark'
        },
        ratings: {
            star1: 'ri-star-fill',
            star2: 'ri-star-fill',
            star3: 'ri-star-fill',
            star4: 'ri-star-fill',
            star5: 'ri-star-half-fill'
        },
        designation: 'Physics Instructor'
    }
];