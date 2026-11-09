import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Building2, ChevronRight, LogOut, LucideAngularModule, Menu } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { OrganizationService } from '../../features/organizations/organization.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})

export class TopbarComponent {

  readonly auth = inject(AuthService);
  readonly organizations = inject(OrganizationService);
  private readonly router = inject(Router);

  readonly menuRequested = output<void>();
  readonly loggingOut = signal(false);
  readonly logoutError = signal('');

  readonly Menu = Menu;
  readonly ChevronRight = ChevronRight;
  readonly Building2 = Building2;
  readonly LogOut = LogOut;

  get initials(): string
  {
    const user = this.auth.user();

    return (
      (user?.firstName?.[0] ?? '') +
      (user?.lastName?.[0] ?? '')
    ).toUpperCase() || 'U';
  }

  logout(): void
  {
    if (this.loggingOut()) return;

    this.loggingOut.set(true);
    this.logoutError.set('');

    this.auth.logout()
      .pipe(finalize(() => this.loggingOut.set(false)))
      .subscribe({
        next: () =>
        {
          this.organizations.clear();
          void this.router.navigate(['/login']);
        },
        error: () =>
        {
          this.logoutError.set(
            'Could not sign out. Please try again.',
          );
        },
      });
  }
}
