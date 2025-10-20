import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-basic',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './basic.component.html',
    styleUrl: './basic.component.scss'
})
export class BasicComponent {}