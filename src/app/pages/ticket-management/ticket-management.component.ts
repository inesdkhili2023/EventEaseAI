import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TicketListComponent } from './ticket-plans-list/ticket-plans-list.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';

@Component({  
  selector: 'app-ticket-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
    TicketListComponent,
    SalesAnalyticsComponent,
  ],
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {
  selectedTab = 0;
  categories: string[] = [];

  constructor(private http: HttpClient) {}  // ✅ inject HttpClient properly

  ngOnInit(): void {
    this.loadCategories();
    console.log('Ticket management component initialized');
  }

  loadCategories(): void {
    this.http.get<{ category_name: string }[]>('/api/ticket-categories')
      .subscribe(data => {
        // Only unique category names
        this.categories = Array.from(new Set(data.map(c => c.category_name)));
        console.log('Active categories from Supabase:', this.categories);
      }, error => {
        console.error('Error fetching categories:', error);
      });
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

  openChatbot(): void {
    console.log('Opening chatbot...');
  }
}
