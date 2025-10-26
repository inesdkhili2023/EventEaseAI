import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { Subject } from 'rxjs';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { HttpClient } from '@angular/common/http';  // ✅ AJOUT IMPORTANT

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIconButton,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgIf,
    FeathericonsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [SupabaseService]
})
export class SignInComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  hide = true;
  isLoading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabase: SupabaseService,
    private snackBar: MatSnackBar,
    private http: HttpClient // ✅ AJOUT ICI
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');

    if (rememberMe === 'true' && savedEmail) {
      this.authForm.patchValue({
        email: savedEmail,
        rememberMe: true
      });
    }

    this.checkExistingSession();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async checkExistingSession(): Promise<void> {
    try {
      const session = await this.supabase.getSession();
      if (session) this.router.navigate(['/home']);
    } catch (error) {
      console.error('Session check error:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.authForm.invalid) {
      this.markFormGroupTouched(this.authForm);
      this.showMessage('Please fill in all required fields correctly', 'error');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { email, password, rememberMe } = this.authForm.value;
      const user = await this.supabase.signIn(email, password);

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
      }

      // ✅ AJOUT : récupérer l'ID du chauffeur après login
      if (user.user_role === 'CHAUFFEUR') {
        this.http.get<{ id: string }>(`http://localhost:8090/api/drivers/by-email/${email}`).subscribe({
          next: (data) => {
            localStorage.setItem('driverId', data.id);
            console.log('✅ driverId sauvegardé :', data.id);
          },
          error: (err) => console.error('Erreur récupération driverId', err)
        });
      }

      this.showMessage(`Welcome back, ${user.email}!`, 'success');
      await this.redirectByRole(user.user_role);
      console.log('User after login:', user);

    } catch (error: any) {
      console.error('Sign in error:', error);
      this.errorMessage = error.message || 'An error occurred during sign in.';
      this.showMessage(this.errorMessage, 'error');
    } finally {
      this.isLoading = false;
    }
  }

  private async redirectByRole(role: string): Promise<void> {
    const routes: { [key: string]: string } = {
      ADMIN: '/project-management',
      CLIENT: '/ecommerce-page',
      OWNER: 'crm-page/leads',
      CHAUFFEUR: '/lms'
    };
    const targetRoute = routes[role] || '/home';
    await new Promise(resolve => setTimeout(resolve, 500));
    this.router.navigate([targetRoute]);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) this.markFormGroupTouched(control);
    });
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: type === 'success' ? 3000 : 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }
  get rememberMe() { return this.authForm.get('rememberMe'); }
}
