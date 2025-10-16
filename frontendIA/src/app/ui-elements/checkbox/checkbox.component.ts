import { Component } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { JsonPipe, NgFor } from '@angular/common';

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatCheckboxModule, FormsModule, NgFor, JsonPipe, ReactiveFormsModule],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {

    task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
            {name: 'Primary', completed: false, color: 'primary'},
            {name: 'Accent', completed: false, color: 'accent'},
            {name: 'Warn', completed: false, color: 'warn'},
        ],
    };

    allComplete: boolean = false;

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach(t => (t.completed = completed));
    }

    toppings = this._formBuilder.group({
        pepperoni: false,
        extracheese: false,
        mushroom: false,
    });

    constructor(private _formBuilder: FormBuilder) {}

}