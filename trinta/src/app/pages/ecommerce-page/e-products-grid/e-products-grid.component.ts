import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService,Event} from '../../../services/event.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventCategory } from '../../../enums/EventCategory';

@Component({
    selector: 'app-e-products-grid',
    standalone: true,
    providers: [
    EventService
  ],
    imports: [CommonModule,HttpClientModule,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './e-products-grid.component.html',
    styleUrl: './e-products-grid.component.scss'
})
export class EProductsGridComponent  implements OnInit{

    events: Event[] = [];
categories = Object.values(EventCategory); // ['SPORTIF', 'CULTUREL', ...]
  selectedCategories: EventCategory[] = [];
    filteredEvents: Event[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of events per page
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
   this.loadEvents();
  }
    loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.totalItems = events.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePage();
    });
  }
  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredEvents = this.events.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  get minIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get maxIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}