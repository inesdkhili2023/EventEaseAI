import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { CoursesCategoryComponent } from './courses-category/courses-category.component';
import { TopInstructorsComponent } from './top-instructors/top-instructors.component';
import { StudentsProgressComponent } from './students-progress/students-progress.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TotalPerformanceComponent } from './total-performance/total-performance.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { DailyPerformanceComponent } from './daily-performance/daily-performance.component';
import { WebsiteOverviewComponent } from './website-overview/website-overview.component';

@Component({
    selector: 'app-lms',
    standalone: true,
    imports: [StatsComponent, CoursesCategoryComponent, TopInstructorsComponent, StudentsProgressComponent, AllCoursesComponent, TotalPerformanceComponent, CoursesOverviewComponent, DailyPerformanceComponent, WebsiteOverviewComponent],
    templateUrl: './lms.component.html',
    styleUrl: './lms.component.scss'
})
export class LmsComponent {}