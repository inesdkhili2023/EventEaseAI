import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-expansion-as-accordion',
    standalone: true,
    imports: [
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatNativeDateModule,
        FeathericonsModule
    ],
    templateUrl: './expansion-as-accordion.component.html',
    styleUrl: './expansion-as-accordion.component.scss'
})
export class ExpansionAsAccordionComponent {

    // Expansion as Accordion
    step = 0;
    setStep(index: number) {
        this.step = index;
    }
    nextStep() {
        this.step++;
    }
    prevStep() {
        this.step--;
    }

}