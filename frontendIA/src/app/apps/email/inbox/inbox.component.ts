import { RouterLink } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-inbox',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatCheckboxModule, MatPaginatorModule],
    templateUrl: './inbox.component.html',
    styleUrl: './inbox.component.scss'
})
export class InboxComponent {

    displayedColumns: string[] = ['select', 'title', 'description', 'date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        title: 'Zephyr Blade',
        description: 'How Tailoring Experiences Can Enhance Customer Satisfaction and Loyalty.',
        date: '20 May, 2024'
    },
    {
        title: 'Dribbble',
        description: 'Get 70% off Dribbble Pro for Cyber Monday! Today',
        date: '19 May, 2024'
    },
    {
        title: 'Instagram',
        description: 'Dictum mauris vestibulum proin velit turpis integer tellus tellus.',
        date: '18 May, 2024'
    },
    {
        title: 'LinkedIn',
        description: 'Convallis aenean egestas vitae ullamcorper aliquet luctus. Ipsum turpis sociis dolor eget lectus sed.',
        date: '17 May, 2024'
    },
    {
        title: 'Shanell Rice',
        description: 'Dictumst gravida nulla sed vitae eget adipiscing eros. Fermentum bibendum morbi in sed amet.',
        date: '16 May, 2024'
    },
    {
        title: 'J. Pinkman, Me (12)',
        description: 'A ac et nisl proin quam lacus. Vitae tempor non imperdiet sed habitasse adipiscing scelerisque risus porttitor.',
        date: '15 May, 2024'
    },
    {
        title: 'D. Warner, Me (10)',
        description: 'Volutpat cursus enim fames magna aliquam facilisis commodo purus.',
        date: '14 May, 2024'
    },
    {
        title: 'Daily UI/UX Design',
        description: 'Tincidunt rhoncus risus id elit. Volutpat risus ut nunc bibendum.',
        date: '13 May, 2024'
    },
    {
        title: 'Google',
        description: 'Scelerisque orci sed lorem vel non dignissim elementum volutpat.',
        date: '12 May, 2024'
    },
    {
        title: 'Website weekly',
        description: 'Faucibus non curabitur felis dignissim urna est. Amet accumsan suspendisse amet commodo sagittis.',
        date: '11 May, 2024'
    },
    {
        title: 'Website weekly',
        description: 'Faucibus non curabitur felis dignissim urna est. Amet accumsan suspendisse amet commodo sagittis.',
        date: '11 May, 2024'
    },
    {
        title: 'Google',
        description: 'Scelerisque orci sed lorem vel non dignissim elementum volutpat.',
        date: '12 May, 2024'
    },
    {
        title: 'D. Warner, Me (10)',
        description: 'Volutpat cursus enim fames magna aliquam facilisis commodo purus.',
        date: '14 May, 2024'
    },
    {
        title: 'Facebook',
        description: 'Exclusive Product Offer on Facebook - Limited Time Only!',
        date: '20 Nov, 2023'
    },
    {
        title: 'J. Pinkman, Me (12)',
        description: 'A ac et nisl proin quam lacus. Vitae tempor non imperdiet sed habitasse adipiscing scelerisque risus porttitor.',
        date: '15 May, 2024'
    },
    {
        title: 'Shanell Rice',
        description: 'Dictumst gravida nulla sed vitae eget adipiscing eros. Fermentum bibendum morbi in sed amet.',
        date: '16 May, 2024'
    },
    {
        title: 'LinkedIn',
        description: 'Convallis aenean egestas vitae ullamcorper aliquet luctus. Ipsum turpis sociis dolor eget lectus sed.',
        date: '17 May, 2024'
    },
    {
        title: 'Instagram',
        description: 'Dictum mauris vestibulum proin velit turpis integer tellus tellus.',
        date: '18 May, 2024'
    },
    {
        title: 'Dribbble',
        description: 'Get 70% off Dribbble Pro for Cyber Monday! Today',
        date: '19 May, 2024'
    },
    {
        title: 'Facebook',
        description: 'Exclusive Product Offer on Facebook - Limited Time Only!',
        date: '20 Nov, 2023'
    }
];

export interface PeriodicElement {
    title: string;
    description: string;
    date: string;
}