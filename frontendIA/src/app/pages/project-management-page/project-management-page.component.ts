import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-project-management-page',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './project-management-page.component.html',
    styleUrl: './project-management-page.component.scss'
})
export class ProjectManagementPageComponent {}