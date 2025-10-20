import { Component } from '@angular/core';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { StatsComponent } from './stats/stats.component';
import { IssuesSummaryComponent } from './issues-summary/issues-summary.component';
import { LiveCallsComponent } from './live-calls/live-calls.component';
import { SupportStatusComponent } from './support-status/support-status.component';
import { AverageResponseTimeComponent } from './average-response-time/average-response-time.component';
import { CustomerSatisfactionComponent } from './customer-satisfaction/customer-satisfaction.component';
import { TicketsStatusComponent } from './tickets-status/tickets-status.component';

@Component({
    selector: 'app-help-desk',
    standalone: true,
    imports: [StatsComponent, AgentsListComponent, IssuesSummaryComponent, LiveCallsComponent, SupportStatusComponent, AverageResponseTimeComponent, CustomerSatisfactionComponent, TicketsStatusComponent],
    templateUrl: './help-desk.component.html',
    styleUrl: './help-desk.component.scss'
})
export class HelpDeskComponent {}