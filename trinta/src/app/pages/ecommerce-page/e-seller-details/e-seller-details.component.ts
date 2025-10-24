import { Component } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { SellerOverviewComponent } from './seller-overview/seller-overview.component';
import { StatsComponent } from './stats/stats.component';

@Component({
    selector: 'app-e-seller-details',
    standalone: true,
    imports: [StatsComponent, SellerOverviewComponent, ProductsListComponent],
    templateUrl: './e-seller-details.component.html',
    styleUrl: './e-seller-details.component.scss'
})
export class ESellerDetailsComponent {}