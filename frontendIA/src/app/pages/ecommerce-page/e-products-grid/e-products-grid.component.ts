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
selectedPriceRange: string = '';
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
      this.filteredEvents = [...this.events]; // initialisation
      this.totalItems = events.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePagination();
    });
  }

  // 🔍 Méthode de filtrage combinée (catégorie + prix)
  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(event.category as EventCategory);

      const matchPrice = this.filterByPrice(event.price);

      return matchCategory && matchPrice;
    });

    this.currentPage = 1;
    this.updatePagination();
  }
   filterByCategory() {
    if (this.selectedCategories.length === 0) {
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(event =>
        this.selectedCategories.includes(event.category as EventCategory)
      );
    }

    this.currentPage = 1; // reset pagination
    this.updatePagination();
  }
    private filterByPrice(price: number): boolean {
    if (!this.selectedPriceRange) return true;

    switch (this.selectedPriceRange) {
      case 'FREE':
        return price === 0;
      case 'LOW':
        return price > 0 && price < 10;
      case 'MID':
        return price >= 10 && price <= 15;
      case 'HIGH':
        return price > 15 && price <= 20;
      case 'PREMIUM':
        return price > 20;
      default:
        return true;
    }
  }

  clearAllFilters() {
  // Réinitialiser les filtres
  this.selectedCategories = [];
  this.selectedPriceRange = '';

  // Réinitialiser les événements filtrés
  this.filteredEvents = [...this.events];

  // Réinitialiser la pagination
  this.currentPage = 1;
  this.updatePagination();
}

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredEvents = this.events.slice(start, end);
  }

  updatePagination() {
    this.totalItems = this.filteredEvents.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedEvents(): Event[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEvents.slice(start, end);
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