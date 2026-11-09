
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import
  {
    Observable,
    catchError,
    finalize,
    map,
    of,
    shareReplay,
    switchMap,
    tap,
    throwError,
  } from 'rxjs';
import
  {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User,
  } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService
{
  private readonly http = inject(HttpClient);
  private readonly api = '/api/v1/auth';

  private readonly userState = signal<User | null>(null);
  private readonly tokenState = signal<string | null>(null);
  private readonly readyState = signal(false);

  private refreshRequest$?: Observable<string>;

  readonly user = this.userState.asReadonly();
  readonly accessToken = this.tokenState.asReadonly();
  readonly ready = this.readyState.asReadonly();

  readonly isAuthenticated = computed(
    () => !!this.userState() && !!this.tokenState(),
  );

  login(data: LoginRequest): Observable<void>
  {
    return this.http
      .post<AuthResponse>(`${ this.api }/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => this.setSession(result)),
        map(() => void 0),
      );
  }

  register(data: RegisterRequest): Observable<void>
  {
    return this.http
      .post<AuthResponse>(`${ this.api }/register`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => this.setSession(result)),
        map(() => void 0),
      );
  }

  refresh(): Observable<string>
  {
    if (this.refreshRequest$)
    {
      return this.refreshRequest$;
    }

    this.refreshRequest$ = this.http
      .post<{ accessToken: string; }>(
        `${ this.api }/refresh`,
        {},
        { withCredentials: true },
      )
      .pipe(
        tap(({ accessToken }) =>
        {
          this.tokenState.set(accessToken);
        }),
        map(({ accessToken }) => accessToken),
        finalize(() =>
        {
          this.refreshRequest$ = undefined;
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    return this.refreshRequest$;
  }

  restoreSession(): Observable<boolean>
  {
    if (this.readyState())
    {
      return of(this.isAuthenticated());
    }

    return this.refresh().pipe(
      switchMap(() =>
        this.http.get<User>(`${ this.api }/me`),
      ),
      tap((user) =>
      {
        this.userState.set(user);
      }),
      map(() => true),
      catchError(() =>
      {
        this.clearSession();
        return of(false);
      }),
      finalize(() =>
      {
        this.readyState.set(true);
      }),
    );
  }

  logout(): Observable<void>
  {
    return this.http
      .post<void>(
        `${ this.api }/logout`,
        {},
        { withCredentials: true },
      )
      .pipe(
        catchError((error) =>
        {
          // Do not report successful server revocation
          // if the logout request failed.
          return throwError(() => error);
        }),
        tap(() => this.clearSession()),
      );
  }

  clearSession(): void
  {
    this.userState.set(null);
    this.tokenState.set(null);
  }

  private setSession(result: AuthResponse): void
  {
    this.userState.set(result.user);
    this.tokenState.set(result.accessToken);
    this.readyState.set(true);
  }
}
