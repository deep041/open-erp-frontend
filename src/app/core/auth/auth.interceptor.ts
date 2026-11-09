
import
  {
    HttpErrorResponse,
    HttpInterceptorFn,
  } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next,
) =>
{
  const auth = inject(AuthService);

  const publicAuthEndpoints = [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/auth/refresh',
    '/api/v1/auth/logout',
  ];

  const isAuthEndpoint = publicAuthEndpoints.some(
    (url) => request.url.split('?')[0] === url,
  );

  const token = auth.accessToken();

  const authenticatedRequest =
    token && !isAuthEndpoint
      ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
        },
      })
      : request;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) =>
    {
      if (
        error.status !== 401 ||
        isAuthEndpoint ||
        !token
      )
      {
        return throwError(() => error);
      }

      return auth.refresh().pipe(
        switchMap((newToken) =>
          next(
            request.clone({
              setHeaders: {
                Authorization: `Bearer ${ newToken }`,
              },
            }),
          ),
        ),
        catchError((refreshError) =>
        {
          if (
            refreshError instanceof HttpErrorResponse &&
            refreshError.status === 401
          )
          {
            auth.clearSession();
          }

          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
