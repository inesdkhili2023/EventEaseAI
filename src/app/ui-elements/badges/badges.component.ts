import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-badges',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
    templateUrl: './badges.component.html',
    styleUrl: './badges.component.scss'
})
export class BadgesComponent {

    // Mat Badges
    hidden = false;
    toggleBadgeVisibility() {
        this.hidden = !this.hidden;
    }

}