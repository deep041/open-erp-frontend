import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrowUpRight, Building2, LogOut, LucideAngularModule, Plus, RefreshCw, X } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { OrganizationMembership } from '../../../core/models/auth.models';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-select',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    LogoComponent
],
  templateUrl: './organization-select.component.html',
  styleUrl: './organization-select.component.scss'
})
export class OrganizationSelectComponent implements OnInit {

  readonly auth = inject(AuthService);
  private readonly organizationService =
    inject(OrganizationService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly ArrowUpRight = ArrowUpRight;
  readonly Plus = Plus;
  readonly X = X;
  readonly Building2 = Building2;
  readonly LogOut = LogOut;
  readonly RefreshCw = RefreshCw;

  readonly organizations =
    signal<OrganizationMembership[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly loggingOut = signal(false);
  readonly showCreateDialog = signal(false);
  readonly error = signal('');
  readonly createError = signal('');

  private lastSuggestedSlug = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        ),
      ],
    ],
  });

  get initials(): string
  {
    const user = this.auth.user();

    return (
      (user?.firstName?.[0] ?? '') +
      (user?.lastName?.[0] ?? '')
    ).toUpperCase() || 'U';
  }

  ngOnInit(): void
  {
    this.load();
  }

  load(): void
  {
    this.loading.set(true);
    this.error.set('');

    this.organizationService.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (items) => this.organizations.set(items),
        error: () =>
        {
          this.error.set('Unable to load organizations.');
        },
      });
  }

  open(membership: OrganizationMembership): void
  {
    this.organizationService.select(membership);

    void this.router.navigate([
      '/org',
      membership.organization.id,
      'dashboard',
    ]);
  }

  openCreateDialog(): void
  {
    this.form.reset();
    this.lastSuggestedSlug = '';
    this.createError.set('');
    this.showCreateDialog.set(true);
  }

  closeCreateDialog(): void
  {
    if (this.saving()) return;
    this.showCreateDialog.set(false);
  }

  suggestSlug(): void
  {
    const name = this.form.controls.name.value;

    const suggested = name
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const slugControl = this.form.controls.slug;

    if (
      !slugControl.value ||
      slugControl.value === this.lastSuggestedSlug
    )
    {
      slugControl.setValue(suggested);
    }

    this.lastSuggestedSlug = suggested;
  }

  create(): void
  {
    if (this.saving()) return;

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.createError.set('');

    this.organizationService
      .create(this.form.getRawValue())
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () =>
        {
          this.showCreateDialog.set(false);
          this.load();
        },
        error: () =>
        {
          this.createError.set(
            'Unable to create organization. The slug may already be in use.',
          );
        },
      });
  }

  logout(): void
  {
    if (this.loggingOut()) return;

    this.loggingOut.set(true);
    this.error.set('');

    this.auth.logout()
      .pipe(finalize(() => this.loggingOut.set(false)))
      .subscribe({
        next: () =>
        {
          this.organizationService.clear();
          void this.router.navigate(['/login']);
        },
        error: () =>
        {
          this.error.set('Unable to log out. Please try again.');
        },
      });
  }

}
