import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-attachments:not(1)',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './attachments.component.html',
    styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent {}