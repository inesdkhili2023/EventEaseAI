import { Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-accordion',
    standalone: true,
    imports: [RouterLink, MatCardModule, CdkAccordionModule],
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

    // Accordion
    items = ['Accordion Item 1', 'Accordion Item 2', 'Accordion Item 3', 'Accordion Item 4', 'Accordion Item 5'];
    expandedIndex = 0;

}