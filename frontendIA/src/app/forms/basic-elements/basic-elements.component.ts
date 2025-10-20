import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-basic-elements',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, BasicFormComponent, FeathericonsModule],
    templateUrl: './basic-elements.component.html',
    styleUrl: './basic-elements.component.scss'
})
export class BasicElementsComponent {}