import { Component } from '@angular/core';
import { SimpleFileUploaderComponent } from './simple-file-uploader/simple-file-uploader.component';
import { MultipleFileUploaderComponent } from './multiple-file-uploader/multiple-file-uploader.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [SimpleFileUploaderComponent, MultipleFileUploaderComponent, MatCardModule],
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {}