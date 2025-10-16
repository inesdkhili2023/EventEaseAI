import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-pm-create-project',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, NgxEditorModule, MatDatepickerModule, FileUploadModule, MatSelectModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './pm-create-project.component.html',
    styleUrl: './pm-create-project.component.scss'
})
export class PmCreateProjectComponent {

    // Text Editor
    editor: Editor;
    html = '';
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    ngOnInit(): void {
        this.editor = new Editor();
    }

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

}