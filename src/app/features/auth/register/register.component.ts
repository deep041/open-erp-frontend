import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Eye, EyeOff, LockKeyhole, LucideAngularModule, Mail, UserRound } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';

function passwordsMatch(
  control: AbstractControl,
): ValidationErrors | null
{
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;

  return password === confirm
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth-page.scss'
})

export class RegisterComponent {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly UserRound = UserRound;
  readonly Mail = Mail;
  readonly LockKeyhole = LockKeyhole;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  readonly year = new Date().getFullYear();

  readonly features = [
    'Manage multiple organizations',
    'Organize your business operations',
    'Collaborate with your team',
    'Open-source and customizable',
  ];

  readonly loading = signal(false);
  readonly error = signal('');
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(12)],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

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

    const {
      firstName,
      lastName,
      email,
      password,
    } = this.form.getRawValue();

    this.auth.register({
      firstName,
      lastName,
      email,
      password,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () =>
        {
          void this.router.navigate(['/organizations']);
        },
        error: () =>
        {
          this.error.set(
            'Unable to create your account. Please try again.',
          );
        },
      });
  }
}
