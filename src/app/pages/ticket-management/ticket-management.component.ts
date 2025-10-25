import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { TicketListComponent } from './ticket-plans-list/ticket-plans-list.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

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
    TicketListComponent,
    SalesAnalyticsComponent,
    
  ],
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {
  selectedTab = 0;

  constructor() {}

  ngOnInit(): void {
    // Initialize component
    console.log('Ticket management component initialized');
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

  openChatbot(): void {
    // This will be handled by the chatbot component itself
    console.log('Opening chatbot...');
  }
}
