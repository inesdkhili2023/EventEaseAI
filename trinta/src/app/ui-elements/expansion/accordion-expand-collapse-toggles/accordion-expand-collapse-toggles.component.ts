import { Component, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-accordion-expand-collapse-toggles',
    standalone: true,
    imports: [
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatNativeDateModule,
        FeathericonsModule
    ],
    templateUrl: './accordion-expand-collapse-toggles.component.html',
    styleUrl: './accordion-expand-collapse-toggles.component.scss'
})
export class AccordionExpandCollapseTogglesComponent {

    @ViewChild(MatAccordion) accordion: MatAccordion;

}