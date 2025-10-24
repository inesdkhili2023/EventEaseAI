import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StWithFormsComponent } from './st-with-forms/st-with-forms.component';

@Component({
    selector: 'app-slide-toggle',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatSlideToggleModule, StWithFormsComponent],
    templateUrl: './slide-toggle.component.html',
    styleUrl: './slide-toggle.component.scss'
})
export class SlideToggleComponent {}