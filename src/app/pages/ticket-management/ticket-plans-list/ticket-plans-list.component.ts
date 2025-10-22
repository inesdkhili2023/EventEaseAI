import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Ticket Categories</h2>
      <button class="btn btn-success mb-3" (click)="addNew()">
        + Add Category
      </button>

      <div *ngIf="categories.length === 0" class="alert alert-info">
        No categories yet. Create your first one!
      </div>

      <div class="table-responsive">
        <table class="table table-striped" *ngIf="categories.length > 0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Price</th>
              <th>Total Quota</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cat of categories">
              <td>{{ cat.categoryName }}</td>
              <td>{{ cat.price }} TND</td>
              <td>{{ cat.totalQuota }}</td>
              <td>{{ cat.availableQuota }}</td>
              <td>
                <span [class]="cat.active ? 'badge bg-success' : 'badge bg-danger'">
                  {{ cat.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-warning me-2" (click)="edit(cat.id)">
                  Edit
                </button>
                <button class="btn btn-sm btn-danger" (click)="deactivate(cat.id)">
                  Deactivate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TicketListComponent implements OnInit {
  eventId: number;
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.loadCategories();
  }

  loadCategories() {
    this.ticketService.getCategoriesByEvent(this.eventId)
      .then(data => this.categories = data)
      .catch(err => alert('Error loading categories: ' + err.message));
  }

  addNew() {
    this.router.navigate(['/events', this.eventId, 'tickets', 'new']);
  }

  edit(categoryId: number) {
    this.router.navigate(['/events', this.eventId, 'tickets', categoryId, 'edit']);
  }

  deactivate(categoryId: number) {
    if (confirm('Deactivate this category?')) {
      this.ticketService.deactivateCategory(categoryId)
        .then(() => {
          alert('Category deactivated');
          this.loadCategories();
        })
        .catch(err => alert('Error: ' + err.message));
    }
  }
}