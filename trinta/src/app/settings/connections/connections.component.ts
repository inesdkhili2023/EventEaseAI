import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-connections',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule],
    templateUrl: './connections.component.html',
    styleUrl: './connections.component.scss'
})
export class ConnectionsComponent {}