import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicSelectComponent } from './basic-select/basic-select.component';
import { SelectMultipleSelectionComponent } from './select-multiple-selection/select-multiple-selection.component';
import { SelectCustomTriggerTextComponent } from './select-custom-trigger-text/select-custom-trigger-text.component';
import { DisabledSelectComponent } from './disabled-select/disabled-select.component';
import { SwacErrorstatematcherComponent } from './swac-errorstatematcher/swac-errorstatematcher.component';
import { SwOptionGroupsComponent } from './sw-option-groups/sw-option-groups.component';
import { SwResetOptionComponent } from './sw-reset-option/sw-reset-option.component';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [RouterLink, MatCardModule, BasicSelectComponent, SelectMultipleSelectionComponent, SelectCustomTriggerTextComponent, DisabledSelectComponent, SwacErrorstatematcherComponent, SwOptionGroupsComponent, SwResetOptionComponent],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent {}