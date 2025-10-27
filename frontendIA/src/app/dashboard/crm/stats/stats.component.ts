import { Component } from '@angular/core';
import { AnnualProfitComponent } from './annual-profit/annual-profit.component';
import { TotalGrowthComponent } from './total-growth/total-growth.component';
import { DailyAverageIncomeComponent } from './daily-average-income/daily-average-income.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { LeadConversationsComponent } from './lead-conversations/lead-conversations.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { UserActivityComponent } from './user-activity/user-activity.component';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [AnnualProfitComponent, TotalGrowthComponent, DailyAverageIncomeComponent, TotalRevenueComponent, LeadConversationsComponent, TotalOrdersComponent, UserActivityComponent],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent {}