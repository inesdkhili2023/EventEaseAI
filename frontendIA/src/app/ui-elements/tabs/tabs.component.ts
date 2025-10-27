import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TgwAsynchronouslyLoadingTcComponent } from './tgw-asynchronously-loading-tc/tgw-asynchronously-loading-tc.component';
import { UtwaCustomLabelTemplateComponent } from './utwa-custom-label-template/utwa-custom-label-template.component';

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatTabsModule, TgwAsynchronouslyLoadingTcComponent, UtwaCustomLabelTemplateComponent, DatePipe],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss'
})
export class TabsComponent {

    // Tab group where the tab content is loaded lazily (when activated)
    tabLoadTimes: Date[] = [];
    getTimeLoaded(index: number) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }
        return this.tabLoadTimes[index];
    }

    // Tab group with paginated tabs
    lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);

}