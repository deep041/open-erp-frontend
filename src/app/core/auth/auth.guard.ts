
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () =>
{
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated())
  {
    return true;
  }

  const result$ = auth.ready()
    ? of(false)
    : auth.restoreSession();

  return result$.pipe(
    map((authenticated) =>
      authenticated
        ? true
        : router.createUrlTree(['/login']),
    ),
  );
};
