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
import { FormsModule } from '@angular/forms';
import { FraudResult, FraudService } from '../../../services/fraud.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-events-list',
  standalone: true,
  providers: [EventService, FraudService],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule

  ],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent implements OnInit {
  displayedColumns: string[] = [
    'title', 'category', 'location', 'address', 'startDate',
    'endDate', 'capacity', 'price', 'images','fraud', 'action'
  ];

  dataSource = new MatTableDataSource<Event>();
  events: Event[] = [];
  searchQuery: string = '';
  fraudScores: { [key: number]: FraudResult } = {}; // 🔹 Initialisé comme objet vide
  loadingScores: { [key: number]: boolean } = {}; // 🔹 État de chargement séparé
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eventService: EventService, 
    private router: Router,
    private fraudService: FraudService, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.dataSource.data = events;
        this.dataSource.paginator = this.paginator;
        console.log('Events loaded:', events.length); // 🔹 Debug
      },
      error: (err) => {
        console.error('Error loading events', err);
      }
    });   
  }

  // 🔹 Méthode pour vérifier si le bouton doit s'afficher
  shouldShowButton(index: number): boolean {
    return !this.fraudScores[index] && !this.loadingScores[index];
  }

  // 🔹 Méthode pour vérifier si on doit afficher le loading
  isLoading(index: number): boolean {
    return this.loadingScores[index] === true;
  }

  // 🔹 Méthode pour vérifier si on doit afficher le score
  hasScore(index: number): boolean {
    return !!this.fraudScores[index] && !this.loadingScores[index];
  }

  calculateFraudScore(index: number, event: Event): void {
    console.log('Calculating fraud score for index:', index, event); // 🔹 Debug
    
    // Mettre l'état en "loading"
    this.loadingScores[index] = true;
    
    this.fraudService.checkFraudForEvents([event]).subscribe({
      next: (scores) => {
        console.log('Fraud scores received:', scores); // 🔹 Debug
        if (scores[0]) {
          this.fraudScores[index] = scores[0];
        }
        this.loadingScores[index] = false;
      },
      error: (error) => {
        console.error('Erreur lors du calcul du fraud score:', error);
        this.loadingScores[index] = false;
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  clearAll(): void {
    this.searchQuery = '';
    this.dataSource.filter = '';
  }

  editEvent(event: Event): void {
    this.router.navigate(['/events/create-an-event', event.id]);
  }

  deleteEvent(event: Event) {
    this.eventService.deleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== event.id);
        this.dataSource.data = this.events;
      },
      error: (err) => console.error('Error deleting event', err)
    });
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