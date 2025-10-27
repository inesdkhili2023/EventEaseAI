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
import { TicketService } from '../../services/ticket.service';

@Component({  
  selector: 'app-ticket-management',
  providers: [TicketService],
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
  categories: any[] = [];

  constructor(private http: HttpClient) {}  // ✅ inject HttpClient properly

  ngOnInit(): void {
    this.loadCategories();  }

  loadCategories(): void {
    this.http.get<any[]>('http://localhost:8096/api/categories')
      .subscribe({
        next: (data) => {
          this.categories = data;  // keep all columns, not just category_name
          console.log('All categories from Supabase:', this.categories);
        },
        error: (err) => {
          console.error('Error fetching ticket categories:', err);
        }
      });
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

  openChatbot(): void {
    console.log('Opening chatbot...');
  }
}