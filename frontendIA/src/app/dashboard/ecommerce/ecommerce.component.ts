import { Component } from '@angular/core';
import { WebsiteOverviewComponent } from './website-overview/website-overview.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { RevenueOverviewComponent } from './revenue-overview/revenue-overview.component';
import { VisitsByWeekComponent } from './visits-by-week/visits-by-week.component';
import { OrderStatisticsComponent } from './order-statistics/order-statistics.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { SalesByLocationsComponent } from './sales-by-locations/sales-by-locations.component';
import { EarningsReportsComponent } from './earnings-reports/earnings-reports.component';

@Component({
    selector: 'app-ecommerce',
    standalone: true,
    imports: [WebsiteOverviewComponent, TopSellingProductsComponent, RevenueOverviewComponent, VisitsByWeekComponent, OrderStatisticsComponent, SalesOverviewComponent, RecentOrdersComponent, TransactionsHistoryComponent, SalesByLocationsComponent, EarningsReportsComponent],
    templateUrl: './ecommerce.component.html',
    styleUrl: './ecommerce.component.scss'
})
export class EcommerceComponent {}