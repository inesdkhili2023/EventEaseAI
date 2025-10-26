import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TicketPlan, TicketSale, SalesAnalytics } from '../models/ticket-category.model';
import { ApiService } from './api.service';

interface TicketCategory {
  id: number;
  category_name: string; // Changed from categoryName to match backend
  price: number;
  total_quota: number; // Changed from totalQuota
  available_quota: number; // Changed from availableQuota
  event_id: number; // Added event_id
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private categories$ = new BehaviorSubject<TicketCategory[]>([]);

  constructor(private api: ApiService, private http: HttpClient) {}

  // Create ticket category
  createCategory(eventId: number, category: Partial<TicketCategory>) {
    return this.api.post(`/api/events/${eventId}/categories`, category);
  }

  // Update ticket category
  updateCategory(categoryId: number, category: Partial<TicketCategory>) {
    return this.api.put(`/api/categories/${categoryId}`, category);
  }

  // Get all categories for event
  getCategoriesByEvent(eventId: number) {
    console.log('🔧 TicketService: Fetching categories for event', eventId);
    
    // Try the event-specific endpoint first
    return this.api.get<TicketCategory[]>(`/api/events/${eventId}/categories`)
      .then(res => {
        console.log('✅ Success with /api/events/{id}/categories:', res);
        this.categories$.next(res.data);
        return res.data;
      })
      .catch(err => {
        console.warn('⚠️ Failed with /api/events/{id}/categories, trying /api/categories');
        
        // Fallback to get all categories and filter by event_id
        return this.api.get<TicketCategory[]>(`/api/categories`)
          .then(res => {
            console.log('✅ Success with /api/categories:', res);
            // Filter categories for this event
            const filtered = res.data.filter(cat => cat.event_id === eventId);
            console.log(`📊 Filtered ${filtered.length} categories for event ${eventId}`);
            this.categories$.next(filtered);
            return filtered;
          });
      });
  }

  // Alternative method: Get all categories (no filtering)
  getAllCategories() {
    console.log('🔧 TicketService: Fetching all categories');
    return this.api.get<TicketCategory[]>(`/api/categories`)
      .then(res => {
        console.log('✅ All categories:', res);
        return res.data;
      });
  }

  // Deactivate category
  deactivateCategory(categoryId: number) {
    return this.api.put(`/api/categories/${categoryId}/deactivate`, {});
  }

  // Get observable
  getCategories$(): Observable<TicketCategory[]> {
    return this.categories$.asObservable();
  }

  // Sales analytics (Observable-based for Angular streams)
  getSalesAnalytics(eventId: string | number, startDate?: Date, endDate?: Date): Observable<SalesAnalytics> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    return this.http.get<SalesAnalytics>(`/api/events/${eventId}/analytics`, { params });
  }
}