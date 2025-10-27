import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-l-lesson-preview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './l-lesson-preview.component.html',
    styleUrl: './l-lesson-preview.component.scss'
})
export class LLessonPreviewComponent {}