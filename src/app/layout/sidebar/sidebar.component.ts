import
  {
    Component,
    inject,
    output
  } from '@angular/core';
import
  {
    RouterLink,
    RouterLinkActive,
  } from '@angular/router';
import
  {
    Calculator,
    ChevronsUpDown,
    FolderKanban,
    LayoutDashboard,
    LucideAngularModule,
    Package,
    Settings,
    ShoppingBag,
    Users
  } from 'lucide-angular';
import { AuthService } from '../../core/auth/auth.service';
import { OrganizationService } from '../../features/organizations/organization.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  readonly auth = inject(AuthService);
  readonly organizations = inject(OrganizationService);

  readonly closeRequested = output<void>();

  readonly LayoutDashboard = LayoutDashboard;
  readonly ChevronsUpDown = ChevronsUpDown;
  readonly FolderKanban = FolderKanban;
  readonly Settings = Settings

  readonly businessItems = [
    { label: 'Sales', icon: ShoppingBag },
    { label: 'Accounting', icon: Calculator },
    { label: 'Inventory', icon: Package },
    { label: 'Customers', icon: Users },
  ];

  get dashboardLink(): string[]
  {
    return [
      '/org',
      this.organizations.selected()?.organization.id ?? '',
      'dashboard',
    ];
  }

  get initials(): string
  {
    const user = this.auth.user();

    return (
      (user?.firstName?.[0] ?? '') +
      (user?.lastName?.[0] ?? '')
    ).toUpperCase() || 'U';
  }

  get fullName(): string
  {
    const user = this.auth.user();

    return [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(' ') || 'ERP User';
  }
}
