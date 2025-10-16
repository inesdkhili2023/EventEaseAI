import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { UserBioComponent } from './user-bio/user-bio.component';
import { RevenueOverviewComponent } from './revenue-overview/revenue-overview.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ActivityComponent } from './activity/activity.component';

@Component({
    selector: 'app-my-profile',
    standalone: true,
    imports: [StatsComponent, ProfileIntroComponent, UserBioComponent, RevenueOverviewComponent, ToDoListComponent, ActivityComponent],
    templateUrl: './my-profile.component.html',
    styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {}