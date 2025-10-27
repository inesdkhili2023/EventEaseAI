import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';

export interface ExampleTab {
    label: string;
    content: string;
}

@Component({
    selector: 'app-tgw-asynchronously-loading-tc',
    standalone: true,
    imports: [MatTabsModule, AsyncPipe],
    templateUrl: './tgw-asynchronously-loading-tc.component.html',
    styleUrl: './tgw-asynchronously-loading-tc.component.scss'
})
export class TgwAsynchronouslyLoadingTcComponent {

    asyncTabs: Observable<ExampleTab[]>;

    constructor() {
        this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
            setTimeout(() => {
                observer.next([
                {label: 'First', content: 'Content 1'},
                {label: 'Second', content: 'Content 2'},
                {label: 'Third', content: 'Content 3'},
                ]);
            }, 1000);
        });
    }

}