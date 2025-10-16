import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-advance',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './advance.component.html',
    styleUrl: './advance.component.scss'
})
export class AdvanceComponent {}