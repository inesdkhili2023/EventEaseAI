import { Component } from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
    selector: 'app-multiple-file-uploader',
    standalone: true,
    imports: [FileUploadModule],
    templateUrl: './multiple-file-uploader.component.html',
    styleUrl: './multiple-file-uploader.component.scss'
})
export class MultipleFileUploaderComponent {}