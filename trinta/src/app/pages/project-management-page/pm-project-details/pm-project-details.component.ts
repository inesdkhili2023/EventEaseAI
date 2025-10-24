import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { AttachmentsComponent } from './attachments/attachments.component';

@Component({
    selector: 'app-pm-project-details',
    standalone: true,
    imports: [StatsComponent, TeamMembersComponent, AboutProjectComponent, ProjectOverviewComponent, AttachmentsComponent],
    templateUrl: './pm-project-details.component.html',
    styleUrl: './pm-project-details.component.scss'
})
export class PmProjectDetailsComponent {}