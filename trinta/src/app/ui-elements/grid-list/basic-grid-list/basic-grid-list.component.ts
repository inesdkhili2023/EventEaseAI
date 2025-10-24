import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-basic-grid-list',
    standalone: true,
    imports: [MatGridListModule, MatCardModule],
    templateUrl: './basic-grid-list.component.html',
    styleUrl: './basic-grid-list.component.scss'
})
export class BasicGridListComponent {}