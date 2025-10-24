import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-apps',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './apps.component.html',
    styleUrl: './apps.component.scss'
})
export class AppsComponent {}