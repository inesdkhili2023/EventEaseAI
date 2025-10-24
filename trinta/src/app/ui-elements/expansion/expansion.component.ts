import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicExpansionComponent } from './basic-expansion/basic-expansion.component';
import { ExpansionAsAccordionComponent } from './expansion-as-accordion/expansion-as-accordion.component';
import { AccordionExpandCollapseTogglesComponent } from './accordion-expand-collapse-toggles/accordion-expand-collapse-toggles.component';

@Component({
    selector: 'app-expansion',
    standalone: true,
    imports: [RouterLink, BasicExpansionComponent, ExpansionAsAccordionComponent, AccordionExpandCollapseTogglesComponent],
    templateUrl: './expansion.component.html',
    styleUrl: './expansion.component.scss'
})
export class ExpansionComponent {}