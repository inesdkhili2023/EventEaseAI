import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Event, EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-events-list',
    standalone: true,
    providers:[EventService],
    imports:[MatIconModule,CommonModule,RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule],
    templateUrl: './events-list.component.html',
    styleUrl: './events-list.component.scss'
})
export class EventsListComponent  implements OnInit{

displayedColumns: string[] = ['title', 'category', 'location', 'address', 'startDate', 'endDate', 'capacity', 'price', 'images','action'];
    dataSource = new MatTableDataSource<Event>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
   constructor(private eventService: EventService, private router:Router) {}
   
    ngOnInit(): void {
    this.loadEvents();
  }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
   loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.dataSource.data = events;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error loading events:', err)
    });
  }
  editEvent(event: Event): void {
  this.router.navigate(['/events/create-an-event', event.id]);
  // Redirige vers: /events/create-an-event/123
}

deleteEvent(event: Event) {
  console.log('Delete event', event);
  // Call service to delete event and refresh table
}

}

export interface PeriodicElement {
    event: any;
    price: string;
    host: string;
    booked: number;
    startTime: string;
    eventDate: string;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        event: {
            img: 'assets/images/events/event1.jpg',
            title: 'Spain Education Seminar',
            hours: '02:55:00'
        },
        price: '$80',
        host: 'Celestial Soiree',
        booked: 45,
        startTime: '11:50 AM',
        eventDate: '17 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event2.jpg',
            title: 'Vacation Winter Party',
            hours: '02:55:00'
        },
        price: '$160',
        host: 'Quantum Quest',
        booked: 8,
        startTime: '10:00 PM',
        eventDate: '18 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event3.jpg',
            title: 'Radiant Reflections Revelry',
            hours: '02:55:00'
        },
        price: '$210',
        host: 'Serendipity Summit',
        booked: 152,
        startTime: '09:45 AM',
        eventDate: '19 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event4.jpg',
            title: 'Grandeur Gala Gateway',
            hours: '02:55:00'
        },
        price: '$150',
        host: 'Astral Gala',
        booked: 250,
        startTime: '12:30 PM',
        eventDate: '20 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event5.jpg',
            title: 'Twilight Tranquility Festival',
            hours: '02:55:00'
        },
        price: '$110',
        host: 'Harmony Haven',
        booked: 704,
        startTime: '1:30 PM',
        eventDate: '21 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event6.jpg',
            title: 'Luminous Labyrinth Gala',
            hours: '02:55:00'
        },
        price: '$80',
        host: 'Zenith Zephyr',
        booked: 851,
        startTime: '2:00 AM',
        eventDate: '22 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event7.jpg',
            title: 'Serendipity Sojourn',
            hours: '02:55:00'
        },
        price: '$90',
        host: 'Mirage Masquerade',
        booked: 325,
        startTime: '3:00 PM',
        eventDate: '23 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event8.jpg',
            title: 'Ethereal Elegance Extravaganza',
            hours: '02:55:00'
        },
        price: '$250',
        host: 'Nebula Nexus',
        booked: 70,
        startTime: '4:00 PM',
        eventDate: '24 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    },
    {
        event: {
            img: 'assets/images/events/event9.jpg',
            title: 'Blissful Beacon Bash',
            hours: '02:55:00'
        },
        price: '$140',
        host: 'Elysian Echo',
        booked: 152,
        startTime: '4:30 PM',
        eventDate: '25 Jan 2024',
        action: {
            edit: 'ri-edit-line',
            delete : 'ri-delete-bin-line'
        }
    }
];