import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-chips-with-input',
    standalone: true,
    imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatCardModule, FeathericonsModule],
    templateUrl: './chips-with-input.component.html',
    styleUrl: './chips-with-input.component.scss'
})
export class ChipsWithInputComponent {

    // Chips with Input
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

    announcer = inject(LiveAnnouncer);

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.fruits.push({name: value});
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(fruit: Fruit): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);

            this.announcer.announce(`Removed ${fruit}`);
        }
    }

    edit(fruit: Fruit, event: MatChipEditedEvent) {
        const value = event.value.trim();

        // Remove fruit if it no longer has a name
        if (!value) {
            this.remove(fruit);
            return;
        }

        // Edit existing fruit
        const index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits[index].name = value;
        }
    }

}