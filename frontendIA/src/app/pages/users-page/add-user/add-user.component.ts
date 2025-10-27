import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../../user-dialog/user-dialog.component';
import { DistanceDialogComponent } from '../../../distance-dialog/distance-dialog.component';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
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
    MatRadioModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent implements OnInit {
  deliveryForm: FormGroup;
  showDeliveryDateTime: boolean = false;
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
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.editor = new Editor();
    this.deliveryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      deliveryDate: [''],
      deliveryHour: [''],
      deliveryTime: ['ASAP'],
      deliveryMinute: [''],
      amPm: [''],
      deliveryAddress: [{ value: '', disabled: false }],
      comment: [''],
      deliveryCharge: [{ value: '', disabled: false }],
      selectArea: [{ value: '', disabled: false }],
      customerPickup: [false],
    });
    // Subscribe to the checkbox value changes
    this.deliveryForm
      .get('customerPickup')
      ?.valueChanges.subscribe((checked) => {
        if (checked) {
          this.deliveryForm.get('deliveryAddress')?.disable();
          this.deliveryForm.get('deliveryCharge')?.disable();
          this.deliveryForm.get('selectArea')?.disable();
        } else {
          this.deliveryForm.get('deliveryAddress')?.enable();
          this.deliveryForm.get('deliveryCharge')?.enable();
          this.deliveryForm.get('selectArea')?.enable();
        }
      });
  }
  onDeliveryTimeChange(event: any) {
    this.showDeliveryDateTime = event.value === 'Later';
  }
  onSubmit(): void {
    if (this.deliveryForm.valid) {
      console.log(this.deliveryForm.value);
      this.openUserDialog();
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }
  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  onLaterClick(): void {
    this.showDeliveryDateTime = true;
  }
  onAsapClick() {
    this.showDeliveryDateTime = false;
  }
  openDistanceDialog(): void {
    const dialogRef = this.dialog.open(DistanceDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Distance: ${result.distance}, Unit: ${result.unit}`);
      }
    });
  }
}
