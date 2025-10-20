import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-basic-drawer',
    standalone: true,
    imports: [MatSidenavModule],
    templateUrl: './basic-drawer.component.html',
    styleUrl: './basic-drawer.component.scss'
})
export class BasicDrawerComponent {}