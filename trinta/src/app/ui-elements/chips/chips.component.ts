import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { ChipsDragDropComponent } from './chips-drag-drop/chips-drag-drop.component';
import { ChipsWithFormControlComponent } from './chips-with-form-control/chips-with-form-control.component';
import { ChipsWithInputComponent } from './chips-with-input/chips-with-input.component';
import { StackedChipsComponent } from './stacked-chips/stacked-chips.component';

@Component({
    selector: 'app-chips',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatChipsModule, ChipsAutocompleteComponent, ChipsDragDropComponent, ChipsWithFormControlComponent, ChipsWithInputComponent, StackedChipsComponent],
    templateUrl: './chips.component.html',
    styleUrl: './chips.component.scss'
})
export class ChipsComponent {}