import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
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
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './e-create-product.component.html',
  styleUrls: ['./e-create-product.component.scss']
})
export class CreatePartnershipComponent implements OnInit, OnDestroy {

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

  isSubmitting = false;
  selectedFile: File | null = null;
  
previewImage: string | null = null;

  constructor(
    private partnershipService: PartnershipService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  // Strip HTML pour validation si besoin
  stripHtmlTags(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  validateForm(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.partnership.name || this.partnership.name.trim() === '') {
      errors.push('Le nom du partenaire est obligatoire');
    }

    if (!this.partnership.type || this.partnership.type.trim() === '') {
      errors.push('Le type de partenariat est obligatoire');
    }

    if (!this.partnership.description || this.partnership.description.trim().length < 10) {
      errors.push('La description doit contenir au moins 10 caractères');
    }

    if (!this.partnership.contractValue || this.partnership.contractValue <= 0) {
      errors.push('La valeur du contrat doit être supérieure à 0');
    }

    if (!this.partnership.startDate) errors.push('La date de début est obligatoire');
    if (!this.partnership.endDate) errors.push('La date de fin est obligatoire');

    if (this.partnership.startDate && this.partnership.endDate) {
      const startDate = new Date(this.partnership.startDate);
      const endDate = new Date(this.partnership.endDate);

      startDate.setHours(0,0,0,0);
      endDate.setHours(0,0,0,0);

      if (endDate <= startDate) errors.push('La date de fin doit être postérieure à la date de début');
    }



    return { valid: errors.length === 0, errors };
  }

createPartnership() {
  if (this.isSubmitting) return;

  const validation = this.validateForm();
  if (!validation.valid) {
    this.showErrorMessage(validation.errors.join('\n'));
    return;
  }

  this.isSubmitting = true;
  this.showInfoMessage('Création du partenariat en cours...');

  const formData = new FormData();
  formData.append('name', this.partnership.name);
  formData.append('type', this.partnership.type);
  formData.append('description', this.partnership.description);
  formData.append('contractValue', this.partnership.contractValue.toString());
  formData.append('startDate', this.partnership.startDate.toISOString());
  formData.append('endDate', this.partnership.endDate.toISOString());
  formData.append('active', this.partnership.active ? 'true' : 'false');

  // Ajouter l’image si sélectionnée
if (this.selectedFile) {
    formData.append('image', this.selectedFile);
}


  this.partnershipService.create(formData).subscribe({
    next: (res: any) => {
      this.isSubmitting = false;
      this.showSuccessMessage('Partenariat créé avec succès !');
      this.resetForm();
      setTimeout(() => this.router.navigate(['/partnerships']), 2000);
    },
    error: (err: any) => {
      this.isSubmitting = false;
      let message = 'Erreur lors de la création';
      if (err.status === 400) message = 'Données invalides';
      else if (err.status === 409) message = 'Un partenariat avec ce nom existe déjà';
      else if (err.status === 500) message = 'Erreur serveur';
      this.showErrorMessage(message);
    }
  });
}


  resetForm() {
    this.partnership = {
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
  }

  uploadImages(event: any) {
    console.log('Upload event:', event); // Vérifier structure

    const files = event.files || event; // Selon version ngx-file-upload
    if (!files || files.length === 0) return;

    const file = files[0].file || files[0].nativeFile;
    if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
      this.showErrorMessage('Fichier invalide. Seul PNG ou JPG sont acceptés.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.partnership.images = [reader.result as string];
      this.showSuccessMessage('Image ajoutée avec succès !');
    };
    reader.readAsDataURL(file);
  }

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    this.selectedFile = file;
  } else {
    this.selectedFile = null;
    this.showErrorMessage('Seul PNG ou JPG sont acceptés');
  }
}

  showSuccessMessage(msg: string) {
    this.snackBar.open(msg, 'Fermer', { duration: 4000, panelClass: ['snackbar-success'], horizontalPosition: 'end', verticalPosition: 'top' });
  }

  showErrorMessage(msg: string) {
    this.snackBar.open(msg, 'Fermer', { duration: 6000, panelClass: ['snackbar-error'], horizontalPosition: 'end', verticalPosition: 'top' });
  }

  showInfoMessage(msg: string) {
    this.snackBar.open(msg, '', { duration: 2000, panelClass: ['snackbar-info'], horizontalPosition: 'end', verticalPosition: 'top' });
  }

  onCancel() {
    if (confirm('Annuler ? Les données non sauvegardées seront perdues.')) {
      this.router.navigate(['/partnerships']);
    }
  }

}
