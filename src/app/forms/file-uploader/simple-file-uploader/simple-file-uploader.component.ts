import { Component } from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
    selector: 'app-simple-file-uploader',
    standalone: true,
    imports: [FileUploadModule],
    templateUrl: './simple-file-uploader.component.html',
    styleUrl: './simple-file-uploader.component.scss'
})
export class SimpleFileUploaderComponent {

    // File Uploader
    public multiple: boolean = false;

}