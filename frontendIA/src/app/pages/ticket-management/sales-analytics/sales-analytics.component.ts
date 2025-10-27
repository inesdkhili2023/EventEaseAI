import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TicketService } from '../../../services/ticket.service';
import { SalesAnalytics, TicketCategory } from '../../../models/ticket-category.model';

@Component({
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './sales-analytics.component.html',
  styleUrls: ['./sales-analytics.component.scss']
})
export class SalesAnalyticsComponent implements OnInit, OnDestroy {
  analytics: SalesAnalytics | null = null;
  loading = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  // Chart data
  categoryBreakdownData: any[] = [];
  dailySalesData: any[] = [];
  
  // Table data
  displayedColumns: string[] = ['planName', 'category', 'sold', 'revenue', 'percentage'];
  
  private destroy$ = new Subject<void>();

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAnalytics(): void {
    this.loading = true;
    const eventId = 'current-event-id'; // This should come from route or service
    
    this.ticketService.getSalesAnalytics(eventId, this.startDate || undefined, this.endDate || undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (analytics) => {
          this.analytics = analytics;
          this.prepareChartData();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading analytics:', error);
          this.loading = false;
        }
      });
  }

  private prepareChartData(): void {
    if (!this.analytics) return;

    // Prepare category breakdown data for chart
    this.categoryBreakdownData = this.analytics.categoryBreakdown.map(item => ({
      name: item.category,
      value: item.revenue,
      percentage: item.percentage
    }));

    // Prepare daily sales data for chart
    this.dailySalesData = this.analytics.dailySales.map(item => ({
      name: new Date(item.date).toLocaleDateString('fr-FR'),
      tickets: item.ticketsSold,
      revenue: item.revenue
    }));
  }

  onDateRangeChange(): void {
    this.loadAnalytics();
  }

  onRefresh(): void {
    this.loadAnalytics();
  }

  getCategoryColor(category: TicketCategory): string {
    switch (category) {
      case TicketCategory.VIP:
        return 'primary';
      case TicketCategory.STANDARD:
        return 'accent';
      case TicketCategory.FREE:
        return 'warn';
      default:
        return 'basic';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(amount);
  }

  getTopSellingPlans(): any[] {
    return this.analytics?.topSellingPlans || [];
  }

  getCategoryBreakdown(): any[] {
    return this.analytics?.categoryBreakdown || [];
  }

  getDailySales(): any[] {
    return this.analytics?.dailySales || [];
  }
}
