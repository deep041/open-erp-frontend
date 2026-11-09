
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = () =>
{
  const auth = inject(AuthService);
  const router = inject(Router);

  const result$ = auth.ready()
    ? of(auth.isAuthenticated())
    : auth.restoreSession();

  return result$.pipe(
    map((authenticated) =>
      authenticated
        ? router.createUrlTree(['/organizations'])
        : true,
    ),
  );
};
