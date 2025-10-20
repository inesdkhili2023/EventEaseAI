import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';

export interface Section {
    name: string;
    updated: Date;
}

@Component({
    selector: 'app-list-with-sections',
    standalone: true,
    imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe],
    templateUrl: './list-with-sections.component.html',
    styleUrl: './list-with-sections.component.scss'
})
export class ListWithSectionsComponent {

    folders: Section[] = [
        {
            name: 'Photos',
            updated: new Date('1/1/24'),
        },
        {
            name: 'Recipes',
            updated: new Date('1/17/24'),
        },
        {
            name: 'Work',
            updated: new Date('1/28/24'),
        },
    ];
    notes: Section[] = [
        {
            name: 'Vacation Itinerary',
            updated: new Date('2/20/24'),
        },
        {
            name: 'Kitchen Remodel',
            updated: new Date('1/18/24'),
        },
    ];

}