import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-confirm-email',
    standalone: true,
    imports: [RouterLink, MatButtonModule, FeathericonsModule],
    templateUrl: './confirm-email.component.html',
    styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {}