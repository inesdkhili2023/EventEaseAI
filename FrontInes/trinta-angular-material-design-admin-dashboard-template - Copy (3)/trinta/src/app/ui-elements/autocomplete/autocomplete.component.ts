import { Component } from '@angular/core';
import { SimpleAutocompleteComponent } from './simple-autocomplete/simple-autocomplete.component';
import { HighlightFirstOptionComponent } from './highlight-first-option/highlight-first-option.component';
import { DisplayValueComponent } from './display-value/display-value.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { OptionGroupsComponent } from './option-groups/option-groups.component';
import { OverviewComponent } from './overview/overview.component';
import { PlainInputComponent } from './plain-input/plain-input.component';
import { RequireOptionSelectedComponent } from './require-option-selected/require-option-selected.component';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    imports: [SimpleAutocompleteComponent, HighlightFirstOptionComponent, DisplayValueComponent, FilterOptionsComponent, OptionGroupsComponent, OverviewComponent, PlainInputComponent, RequireOptionSelectedComponent],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {}