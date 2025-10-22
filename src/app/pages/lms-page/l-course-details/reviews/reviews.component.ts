import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatPaginatorModule, MatTableModule, FeathericonsModule, MatProgressBarModule, MatMenuModule, NgIf, NgFor],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

    displayedColumns: string[] = ['reviewer', 'ratings', 'date', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    reviewer: any;
    ratings: any;
    date: any;
    status: any;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        reviewer: {
            img: 'assets/images/users/user20.jpg',
            name: 'Celestial Cipher',
            email: 'celestial@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user2.jpg',
            name: 'Zephyr Zing',
            email: 'zephyr@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user5.jpg',
            name: 'Nova Nectar',
            email: 'nova@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            // pending: 'Pending',
            published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user7.jpg',
            name: 'Isabella Chang',
            email: 'isabella@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user21.jpg',
            name: 'Olivia Bennett',
            email: 'oliva@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user21.jpg',
            name: 'Olivia Bennett',
            email: 'oliva@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user7.jpg',
            name: 'Isabella Chang',
            email: 'isabella@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user2.jpg',
            name: 'Zephyr Zing',
            email: 'zephyr@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user5.jpg',
            name: 'Nova Nectar',
            email: 'nova@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            // pending: 'Pending',
            published : 'Published'
        },
        action: 'ri-more-fill'
    },
    {
        reviewer: {
            img: 'assets/images/users/user20.jpg',
            name: 'Celestial Cipher',
            email: 'celestial@info.com'
        },
        ratings: {
            stars: [
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
            review: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit.`
        },
        date: {
            date: 'Dec 17',
            time: '08:30 PM'
        },
        status: {
            pending: 'Pending',
            // published : 'Published'
        },
        action: 'ri-more-fill'
    }
];