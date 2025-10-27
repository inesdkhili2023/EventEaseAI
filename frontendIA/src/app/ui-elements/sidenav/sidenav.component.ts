import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AutosizeSidenavComponent } from './autosize-sidenav/autosize-sidenav.component';
import { BasicDrawerComponent } from './basic-drawer/basic-drawer.component';
import { DweBackdropSettingComponent } from './dwe-backdrop-setting/dwe-backdrop-setting.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterLink, MatCardModule, AutosizeSidenavComponent, BasicDrawerComponent, DweBackdropSettingComponent],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {}