import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { EventService } from '../../../services/event.service';
import { EventCategory } from '../../../enums/EventCategory';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-an-event',
    standalone: true,
    providers: [EventService,provideNativeDateAdapter()],
    imports: [HttpClientModule,CommonModule,ReactiveFormsModule, MatCardModule, MatButtonModule, MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, NgxEditorModule, MatDatepickerModule, FileUploadModule, MatSelectModule, MatRadioModule],
    templateUrl: './create-an-event.component.html',
    styleUrl: './create-an-event.component.scss'
})
export class CreateAnEventComponent implements OnInit {

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
eventForm!: FormGroup;
  eventCategories = Object.values(EventCategory);
  isEditMode = false;
  isLoading = false;
  eventId: string | null = null;
  pageTitle = 'Create New Event';
  constructor(private fb: FormBuilder, private eventService: EventService,private snackBar: MatSnackBar,
  private router: Router,private location: Location,    private route: ActivatedRoute  // 👈 N'oubliez pas d'injecter ActivatedRoute
) {}

    ngOnInit(): void {
        // 👇 METTEZ CE CODE ICI DANS ngOnInit()
    this.eventId = this.route.snapshot.paramMap.get('id');
    
    if (this.eventId) {
      this.isEditMode = true;
      this.pageTitle = 'Edit Event';  // Changer le titre
      this.loadEvent(this.eventId);
    }
      this.editor = new Editor();
      this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      organizerId: [0, Validators.required],
      images: [''],
      price: [0, Validators.required]
    });
    }
onSubmit(): void {
    if (!this.eventForm.valid) return;

    const event = { ...this.eventForm.value };

    // Convert JS Date to ISO string for Spring Boot
    event.startDate = event.startDate?.toISOString();
    event.endDate = event.endDate?.toISOString();
    
    // Convert images string en tableau si tu utilises un input texte
    if (typeof event.images === 'string') {
      event.images = event.images.split(',').map((img: string) => img.trim());
    }
    
    console.log('Sending event:', event);

    // ✅ LOGIQUE AJOUTÉE: Vérifier si mode édition ou création
    if (this.isEditMode && this.eventId) {
      // 📝 MODE ÉDITION - Mettre à jour l'événement existant
      const numericId = Number(this.eventId);
      this.eventService.updateEvent(numericId, event).subscribe({
        next: (res) => {
          // Afficher toaster
          this.snackBar.open('✅ Event updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          // Redirection
          this.router.navigate(['/project-management']);
        },
        error: (err) => console.error('❌ Error updating event:', err)
      });
    } else {
      // ➕ MODE CRÉATION - Créer un nouvel événement
      this.eventService.addEvent(event).subscribe({
        next: (res) => {
          // Afficher toaster
          this.snackBar.open('✅ Event created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          // Redirection
          this.router.navigate(['/project-management']);
        },
        error: (err) => console.error('❌ Error creating event:', err)
      });
    }
}
  goBack(): void {
  this.location.back();
}
// Méthode pour charger les données de l'événement
  loadEvent(id: string): void {
  this.isLoading = true;
  // Convertir le string en number
  const numericId = Number(id);
  
  this.eventService.getEventById(numericId).subscribe({
      next: (event) => {
        this.eventForm.patchValue({
          title: event.title,
          category: event.category,
          location: event.location,
          address: event.address,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          capacity: event.capacity,
          price: event.price,
          description: event.description || '',
          imageUrl: event.images && event.images.length > 0 ? event.images[0] : ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading event:', err);
        this.snackBar.open('Error loading event', 'error');
        this.isLoading = false;
        this.router.navigate(['/events']);
      }
    });
  }
    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }
   

}