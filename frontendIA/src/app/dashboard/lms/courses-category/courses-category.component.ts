import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-courses-category',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './courses-category.component.html',
    styleUrl: './courses-category.component.scss'
})
export class CoursesCategoryComponent {}