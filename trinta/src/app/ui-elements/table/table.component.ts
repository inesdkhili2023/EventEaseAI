import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { StylingColumnsUtagColumnNamesComponent } from './styling-columns-utag-column-names/styling-columns-utag-column-names.component';
import { AddingRemovingDataWuaabDatasourceComponent } from './adding-removing-data-wuaab-datasource/adding-removing-data-wuaab-datasource.component';
import { DynamicallyChangingColumnsDisplayedComponent } from './dynamically-changing-columns-displayed/dynamically-changing-columns-displayed.component';
import { ArDataWuaObservableBasedDatasourceComponent } from './ar-data-wua-observable-based-datasource/ar-data-wua-observable-based-datasource.component';
import { TwExpandableRowsComponent } from './tw-expandable-rows/tw-expandable-rows.component';
import { TableWithFilteringComponent } from './table-with-filtering/table-with-filtering.component';
import { FooterRowTableComponent } from './footer-row-table/footer-row-table.component';
import { RetrievingDataThroughHttpComponent } from './retrieving-data-through-http/retrieving-data-through-http.component';
import { MultipleHeaderFooterRowsComponent } from './multiple-header-footer-rows/multiple-header-footer-rows.component';
import { DtwSortingPaginationFilteringComponent } from './dtw-sorting-pagination-filtering/dtw-sorting-pagination-filtering.component';
import { TableWithPaginationComponent } from './table-with-pagination/table-with-pagination.component';
import { TwReOrderableColumnsComponent } from './tw-re-orderable-columns/tw-re-orderable-columns.component';
import { TableWithSelectionComponent } from './table-with-selection/table-with-selection.component';
import { TableWithSortingComponent } from './table-with-sorting/table-with-sorting.component';
import { TableWithStickyColumnsComponent } from './table-with-sticky-columns/table-with-sticky-columns.component';
import { TableWithStickyFooterComponent } from './table-with-sticky-footer/table-with-sticky-footer.component';
import { TableWithStickyHeaderComponent } from './table-with-sticky-header/table-with-sticky-header.component';
import { TwMaterialDesignRipplesComponent } from './tw-material-design-ripples/tw-material-design-ripples.component';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [RouterLink, MatCardModule, BasicTableComponent, StylingColumnsUtagColumnNamesComponent, AddingRemovingDataWuaabDatasourceComponent, DynamicallyChangingColumnsDisplayedComponent, ArDataWuaObservableBasedDatasourceComponent, TwExpandableRowsComponent, TableWithFilteringComponent, FooterRowTableComponent, RetrievingDataThroughHttpComponent, MultipleHeaderFooterRowsComponent, DtwSortingPaginationFilteringComponent, TableWithPaginationComponent, TwReOrderableColumnsComponent, TableWithSelectionComponent, TableWithSortingComponent, TableWithStickyColumnsComponent, TableWithStickyFooterComponent, TableWithStickyHeaderComponent, TwMaterialDesignRipplesComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {}