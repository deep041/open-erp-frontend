import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';
import { organizationGuard } from './features/organizations/organization.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then((m) => m.RegisterComponent),
  },
  {
    path: 'organizations',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/organizations/organization-select/organization-select.component'
      ).then((m) => m.OrganizationSelectComponent),
  },
  {
    path: 'org/:organizationId',
    canActivate: [authGuard, organizationGuard],
    loadComponent: () =>
      import('./layout/erp-shell/erp-shell.component')
        .then((m) => m.ErpShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then((m) => m.DashboardComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'organizations',
  },
  {
    path: '**',
    redirectTo: 'organizations',
  },
];
