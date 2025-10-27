import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-website-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './website-overview.component.html',
    styleUrl: './website-overview.component.scss'
})
export class WebsiteOverviewComponent {}