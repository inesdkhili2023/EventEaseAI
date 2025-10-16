import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-friends',
    standalone: true,
    imports: [RouterLink, MatCardModule],
    templateUrl: './friends.component.html',
    styleUrl: './friends.component.scss'
})
export class FriendsComponent {}