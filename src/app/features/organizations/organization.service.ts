
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Organization, OrganizationMembership } from '../../core/models/auth.models';

@Injectable({ providedIn: 'root' })
export class OrganizationService
{
  private readonly http = inject(HttpClient);
  private readonly api = '/api/v1/organizations';

  private readonly selectedState =
    signal<OrganizationMembership | null>(null);

  readonly selected = this.selectedState.asReadonly();

  list()
  {
    return this.http.get<OrganizationMembership[]>(
      this.api,
    );
  }

  create(data: { name: string; slug: string; })
  {
    return this.http.post<Organization>(this.api, data);
  }

  select(membership: OrganizationMembership): void
  {
    this.selectedState.set(membership);
  }

  clear(): void
  {
    this.selectedState.set(null);
  }
}
