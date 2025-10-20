import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatPaginatorModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {}