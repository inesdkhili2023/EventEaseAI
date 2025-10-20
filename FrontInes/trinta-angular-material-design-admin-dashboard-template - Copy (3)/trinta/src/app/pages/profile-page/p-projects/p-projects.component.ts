import { Component, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AllComponent } from './all/all.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { CompletedComponent } from './completed/completed.component';
import { PendingComponent } from './pending/pending.component';
import { SearchPageComponent } from '../../search-page/search-page.component';
import { ELEMENT_DATA as ELEMENT_DATA_ALL } from './all/all.component';
import { ELEMENT_DATA as ELEMENT_DATA_IN_PROGRESS } from './in-progress/in-progress.component';
import { ELEMENT_DATA as ELEMENT_DATA_PENDING } from './completed/completed.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p-projects',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, AllComponent, InProgressComponent, CompletedComponent, PendingComponent, SearchPageComponent, FormsModule],
  templateUrl: './p-projects.component.html',
  styleUrls: ['./p-projects.component.scss']
})
export class PProjectsComponent {
  searchText: string = '';
  filteredDataAll = ELEMENT_DATA_ALL;
  filteredDataInProgress = ELEMENT_DATA_IN_PROGRESS;
  filteredDataPending = ELEMENT_DATA_PENDING;

  constructor(private cdr: ChangeDetectorRef) {}

  applyFilter() {
    const searchText = this.searchText.toLowerCase();

    this.filteredDataAll = ELEMENT_DATA_ALL.filter((item: any) => {
      return item.project.title.toLowerCase().includes(searchText) ||
             item.driver.toLowerCase().includes(searchText) ||
             item.dueDate.toLowerCase().includes(searchText) ||
             item.dueamount.toLowerCase().includes(searchText) ||
             item.members.some((member: { name: string, img: string }) => member.name.toLowerCase().includes(searchText));
    });

    this.filteredDataInProgress = ELEMENT_DATA_IN_PROGRESS.filter((item: any) => {
      return item.project.title.toLowerCase().includes(searchText) ||
             item.driver.toLowerCase().includes(searchText) ||
             item.dueDate.toLowerCase().includes(searchText) ||
             item.dueamount.toLowerCase().includes(searchText) ||
             item.members.some((member: { name: string, img: string }) => member.name.toLowerCase().includes(searchText));
    });

    this.filteredDataPending = ELEMENT_DATA_PENDING.filter((item: any) => {
      return item.project.title.toLowerCase().includes(searchText) ||
             item.driver.toLowerCase().includes(searchText) ||
             item.dueDate.toLowerCase().includes(searchText) ||
             item.dueamount.toLowerCase().includes(searchText) ||
             item.members.some((member: { name: string, img: string }) => member.name.toLowerCase().includes(searchText));
    });

    this.cdr.detectChanges(); // Force change detection if necessary
  }
}
