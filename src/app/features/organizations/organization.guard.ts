
import { inject } from '@angular/core';
import
  {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
  } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { OrganizationService } from './organization.service';

export const organizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
) =>
{
  const organizations = inject(OrganizationService);
  const router = inject(Router);

  const organizationId =
    route.paramMap.get('organizationId');

  if (!organizationId)
  {
    return router.createUrlTree(['/organizations']);
  }

  return organizations.list().pipe(
    map((memberships) =>
      memberships.find(
        (item) =>
          item.organization.id === organizationId,
      ),
    ),
    tap((membership) =>
    {
      if (membership)
      {
        organizations.select(membership);
      }
    }),
    map((membership) =>
      membership
        ? true
        : router.createUrlTree(['/organizations']),
    ),
    catchError(() =>
      of(router.createUrlTree(['/organizations'])),
    ),
  );
};
