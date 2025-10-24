import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-file-manager',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, FeathericonsModule, MatProgressBarModule],
    templateUrl: './file-manager.component.html',
    styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent {

    displayedColumns: string[] = ['fileName', 'owner', 'fileSize', 'listedDate', 'fileItem', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    fileName: string;
    owner: string;
    fileSize: string;
    listedDate: string;
    fileItem: number;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        fileName: 'Dashboarddesign.pdf',
        owner: 'Thomas Antony',
        fileSize: '0.95 GB',
        listedDate: '10 July 2024',
        fileItem: 57,
        action: 'ri-more-fill'
    },
    {
        fileName: 'Course Project File',
        owner: 'Alina Smith',
        fileSize: '0.99 GB',
        listedDate: '11 July 2024',
        fileItem: 72,
        action: 'ri-more-fill'
    },
    {
        fileName: 'App Design File',
        owner: 'Davib Warner',
        fileSize: '104 MB',
        listedDate: '12 July 2024',
        fileItem: 99,
        action: 'ri-more-fill'
    },
    {
        fileName: 'Presentation.mp4',
        owner: 'Antony James',
        fileSize: '0.32 GB',
        listedDate: '13 July 2024',
        fileItem: 42,
        action: 'ri-more-fill'
    },
    {
        fileName: 'NFT_Web_design.pdf',
        owner: 'Olivia Lucy',
        fileSize: '0.54 GB',
        listedDate: '14 July 2024',
        fileItem: 11,
        action: 'ri-more-fill'
    },
    {
        fileName: 'Folder Image',
        owner: 'Gleen Maxwel',
        fileSize: '1.11 GB',
        listedDate: '15 July 2024',
        fileItem: 65,
        action: 'ri-more-fill'
    },
    {
        fileName: 'Personal Tools',
        owner: 'James Andy',
        fileSize: '2.23 GB',
        listedDate: '16 July 2024',
        fileItem: 54,
        action: 'ri-more-fill'
    },
    {
        fileName: 'Dashboard.psd',
        owner: 'Mark Chapmen',
        fileSize: '1.43 GB',
        listedDate: '17 July 2024',
        fileItem: 42,
        action: 'ri-more-fill'
    }
];