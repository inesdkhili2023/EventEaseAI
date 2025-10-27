import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { IssuesSummaryComponent } from './issues-summary/issues-summary.component';
import { TasksPerformanceComponent } from './tasks-performance/tasks-performance.component';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsListComponent } from '../../pages/events-page/events-list/events-list.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { CommentAdminComponent } from "../../pages/admin-page/comment-admin/comment-admin.component"; // <-- obligatoire

@Component({
    selector: 'app-project-management',
    standalone: true,
    providers:[EventService],
    imports: [CommonModule, StatsComponent, HttpClientModule, AllProjectsComponent, ToDoListComponent, IssuesSummaryComponent, TasksPerformanceComponent, TasksOverviewComponent, CalendarComponent, CommentAdminComponent],
    templateUrl: './project-management.component.html',
    styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {}