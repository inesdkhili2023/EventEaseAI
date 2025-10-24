import { Component } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { AdvanceComponent } from './advance/advance.component';

@Component({
    selector: 'app-timeline-page',
    standalone: true,
    imports: [BasicComponent, AdvanceComponent],
    templateUrl: './timeline-page.component.html',
    styleUrl: './timeline-page.component.scss'
})
export class TimelinePageComponent {}