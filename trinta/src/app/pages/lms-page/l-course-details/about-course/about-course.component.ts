import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-about-course',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './about-course.component.html',
    styleUrl: './about-course.component.scss'
})
export class AboutCourseComponent {}