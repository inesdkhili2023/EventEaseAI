import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { PartnershipService } from '../../../services/partnership.service';
import { Partnership } from '../../../models/partnership.model';

@Component({
  selector: 'app-create-partnership',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeathericonsModule,
    NgxEditorModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './e-create-product.component.html',
  styleUrls: ['./e-create-product.component.scss']
})
export class CreatePartnershipComponent implements OnInit, OnDestroy {

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

  partnership: Partnership = {
    id: 0,
    name: '',
    type: '',
    description: '',
    contractValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    active: true,
    images: []
  };

  constructor(private partnershipService: PartnershipService) {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createPartnership() {
    // Récupérer le contenu du texte enrichi
    this.partnership.description = this.html;

this.partnershipService.create(this.partnership).subscribe({
  next: (res: Partnership) => {
    console.log('Partnership créé:', res);
  },
  error: (err: any) => console.error('Erreur création:', err)
});

  }

  uploadImages(event: any) {
    // Vérifier si des fichiers ont été sélectionnés
    if (event && event.length > 0) {
      // Initialiser le tableau si nécessaire
      if (!this.partnership.images) {
        this.partnership.images = [];
      }
    
      this.partnership.images.push(...event);
    }
  }
}
