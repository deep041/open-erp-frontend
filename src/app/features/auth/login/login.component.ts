import { Component, inject, signal } from '@angular/core';
import
  {
    FormBuilder,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowRight, Eye, EyeOff, LockKeyhole, LucideAngularModule, Mail } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    LogoComponent
],
  templateUrl: './login.component.html',
  styleUrl: '../auth-page.scss'
})

export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly Mail = Mail;
  readonly LockKeyhole = LockKeyhole;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly ArrowRight = ArrowRight;

  readonly year = new Date().getFullYear();
  readonly bars = [38, 57, 48, 72, 60, 84, 70, 95];

  readonly loading = signal(false);
  readonly error = signal('');
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void
  {
    if (this.loading()) return;

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () =>
        {
          void this.router.navigate(['/organizations']);
        },
        error: () =>
        {
          this.error.set(
            'Unable to sign in. Please check your credentials.',
          );
        },
      });
  }

}
