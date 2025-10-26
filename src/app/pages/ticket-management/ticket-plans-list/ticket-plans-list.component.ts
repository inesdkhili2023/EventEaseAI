import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="ticket-list-container">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <h1 class="page-title">Ticket Categoriess</h1>
          <p class="page-subtitle">Manage and organize your ticket inventory</p>
         </div>
         <button class="btn-add-category" (click)="addNew()">
          <span class="plus-icon">+</span> Add Category
        </button>
      </div>
 
      <!-- Empty State -->
      <div *ngIf="categories.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No categories yet</h3>
        <p>Create your first ticket category to get started</p>
        <button class="btn-add-category" (click)="addNew()">
          <span class="plus-icon">+</span> Create First Category
        </button>
      </div>

      <!-- Table Section -->
      <div *ngIf="categories.length > 0" class="table-wrapper">
        <div class="table-container">
          <table class="categories-table">
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
              <tr *ngFor="let cat of categories" class="table-row">
                <td class="cell-category">
                  <span class="category-name">{{ cat.categoryName }}</span>
                </td>
                <td class="cell-price">
                  <span class="price-badge">{{ cat.price }} TND</span>
                </td>
                <td class="cell-quota">{{ cat.totalQuota }}</td>
                <td class="cell-available">
                  <span class="available-count">{{ cat.availableQuota }}</span>
                </td>
                <td class="cell-status">
                  <span [class]="'status-badge ' + (cat.active ? 'status-active' : 'status-inactive')">
                    {{ cat.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="cell-actions">
                  <button class="btn-action btn-edit" (click)="edit(cat.id)" title="Edit category">
                    ✎ Edit
                  </button>
                  <button class="btn-action btn-deactivate" (click)="deactivate(cat.id)" title="Deactivate category">
                    ✕ Deactivate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .ticket-list-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
      padding: 2rem;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 2rem;
    }

    .header-content h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .page-subtitle {
      font-size: 0.95rem;
      color: #718096;
      margin: 0.5rem 0 0 0;
    }

    .btn-add-category {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #0f4ca5 0%, #0a3a7f 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(15, 76, 165, 0.2);
    }

    .btn-add-category:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 76, 165, 0.3);
    }

    .plus-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: #718096;
      margin: 0 0 1.5rem 0;
    }

    .table-wrapper {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .categories-table {
      width: 100%;
      border-collapse: collapse;
    }

    .categories-table thead {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-bottom: 2px solid #e2e8f0;
    }

    .categories-table th {
      padding: 1rem;
      text-align: left;
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .table-row {
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.2s ease;
    }

    .table-row:hover {
      background-color: #f8fafc;
    }

    .categories-table td {
      padding: 1rem;
      color: #334155;
      font-size: 0.95rem;
    }

    .cell-category {
      font-weight: 600;
      color: #1a202c;
    }

    .category-name {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #eff6ff;
      color: #0f4ca5;
      border-radius: 0.375rem;
      font-weight: 500;
    }

    .price-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: #f0fdf4;
      color: #16a34a;
      border-radius: 0.375rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .available-count {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: #fef3c7;
      color: #b45309;
      border-radius: 0.375rem;
      font-weight: 600;
    }

    .status-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-active {
      background: #dcfce7;
      color: #166534;
    }

    .status-inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    .cell-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-action {
      padding: 0.5rem 0.875rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn-edit {
      background: #dbeafe;
      color: #0f4ca5;
    }

    .btn-edit:hover {
      background: #bfdbfe;
      transform: translateY(-1px);
    }

    .btn-deactivate {
      background: #fee2e2;
      color: #dc2626;
    }

    .btn-deactivate:hover {
      background: #fecaca;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        align-items: flex-start;
      }

      .header-content h1 {
        font-size: 1.5rem;
      }

      .categories-table th,
      .categories-table td {
        padding: 0.75rem 0.5rem;
        font-size: 0.85rem;
      }

      .btn-action {
        padding: 0.375rem 0.625rem;
        font-size: 0.75rem;
      }
    }
  `,
  ],
})
export class TicketListComponent implements OnInit {
  eventId: number
  categories: any[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get("eventId"))
    this.loadCategories()
  }

  loadCategories() {
    this.ticketService
      .getCategoriesByEvent(this.eventId)
      .then((data) => (this.categories = data))
      .catch((err) => alert("Error loading categories: " + err.message))
  }

  addNew() {
    this.router.navigate(["/events", this.eventId, "tickets", "new"])
  }

  edit(categoryId: number) {
    this.router.navigate(["/events", this.eventId, "tickets", categoryId, "edit"])
  }

  deactivate(categoryId: number) {
    if (confirm("Deactivate this category?")) {
      this.ticketService
        .deactivateCategory(categoryId)
        .then(() => {
          alert("Category deactivated")
          this.loadCategories()
        })
        .catch((err) => alert("Error: " + err.message))
    }
  }
}