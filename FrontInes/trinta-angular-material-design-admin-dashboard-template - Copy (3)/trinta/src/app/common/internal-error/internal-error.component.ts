import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-internal-error',
	standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule],
	templateUrl: './internal-error.component.html',
	styleUrl: './internal-error.component.scss'
})
export class InternalErrorComponent {}