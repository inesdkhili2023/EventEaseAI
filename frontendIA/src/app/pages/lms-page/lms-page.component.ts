import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-lms-page',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './lms-page.component.html',
    styleUrl: './lms-page.component.scss'
})
export class LmsPageComponent {}