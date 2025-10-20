import { Component } from '@angular/core';
import { EcommerceComponent } from '../dashboard/ecommerce/ecommerce.component';
import { CrmComponent } from '../dashboard/crm/crm.component';
import { ProjectManagementComponent } from '../dashboard/project-management/project-management.component';
import { LmsComponent } from '../dashboard/lms/lms.component';
import { HelpDeskComponent } from '../dashboard/help-desk/help-desk.component';

@Component({
    selector: 'app-widgets',
    standalone: true,
    imports: [EcommerceComponent, CrmComponent, ProjectManagementComponent, LmsComponent, HelpDeskComponent],
    templateUrl: './widgets.component.html',
    styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {}