import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-newsfeed',
    standalone: true,
    imports: [RouterLink, MatMenuModule, MatButtonModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, FeathericonsModule],
    templateUrl: './newsfeed.component.html',
    styleUrl: './newsfeed.component.scss'
})
export class NewsfeedComponent {}