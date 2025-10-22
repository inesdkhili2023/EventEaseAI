import { Component } from '@angular/core';
import { TRecentOrdersComponent } from './t-recent-orders/t-recent-orders.component';
import { TTransactionsHistoryComponent } from './t-transactions-history/t-transactions-history.component';
import { TEarningsReportsComponent } from './t-earnings-reports/t-earnings-reports.component';
import { TLeadsReportComponent } from './t-leads-report/t-leads-report.component';
import { TPaymentHistoryComponent } from './t-payment-history/t-payment-history.component';
import { TToDoListComponent } from './t-to-do-list/t-to-do-list.component';
import { TAllProjectsComponent } from './t-all-projects/t-all-projects.component';
import { TTopInstructorsComponent } from './t-top-instructors/t-top-instructors.component';
import { TAllCoursesComponent } from './t-all-courses/t-all-courses.component';
import { TAgentsListComponent } from './t-agents-list/t-agents-list.component';

@Component({
    selector: 'app-tables',
    standalone: true,
    imports: [TRecentOrdersComponent, TTransactionsHistoryComponent, TEarningsReportsComponent, TLeadsReportComponent, TPaymentHistoryComponent, TToDoListComponent, TAllProjectsComponent, TTopInstructorsComponent, TAllCoursesComponent, TAgentsListComponent],
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.scss'
})
export class TablesComponent {}