import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TicketPlan, TicketSale, SalesAnalytics,} from '../models/ticket-category.model';
import { ApiService } from './api.service';
interface TicketCategory {
  id: number;
  categoryName: string;
  price: number;
  totalQuota: number;
  availableQuota: number;
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
    return this.api.get<TicketCategory[]>(`/api/events/${eventId}/categories`)
      .then(res => {
        this.categories$.next(res.data);
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