
export interface User
{
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface AuthResponse
{
  user: User;
  accessToken: string;
}

export interface LoginRequest
{
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest
{
  firstName: string;
  lastName: string;
}

export type OrganizationRole =
  | 'OWNER'
  | 'ADMIN'
  | 'MEMBER';

export interface Organization
{
  id: string;
  name: string;
  slug: string;
}

export interface OrganizationMembership
{
  role: OrganizationRole;
  organization: Organization;
}
