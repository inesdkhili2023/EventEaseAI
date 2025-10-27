import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [RouterLink, MatButton, MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    providers: [SupabaseService]
})
export class SignUpComponent {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private supabase: SupabaseService
    ) {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // Password Hide
    hide = true;
    selectedFile: File | null = null;
    onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

async uploadImage() {
  if (this.selectedFile) {
    const { data, error } = await this.supabase.storage
      .from('avatars')
      .upload(`profiles/${Date.now()}_${this.selectedFile.name}`, this.selectedFile);
    if (error) throw error;
    return data?.path;
  }
  return null;
}

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.router.navigate(['/']);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

}
