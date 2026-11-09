
export type ErpSortDirection = 'asc' | 'desc';

export interface ErpTableColumn<T>
{
  key: string;
  header: string;
  value: (row: T) => string | number | null | undefined;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'badge';
  badgeColor?: (row: T) => 'success' | 'warning' | 'danger' | 'neutral';
}

export interface ErpTableQuery
{
  page: number;
  pageSize: number;
  search: string;
  sortBy?: string;
  sortDirection?: ErpSortDirection;
  filters?: Record<string, string | string[]>;
}

export interface ErpPageResult<T>
{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ErpTableAction<T>
{
  label: string;
  icon?: string;
  variant?: 'default' | 'danger';
  disabled?: (row: T) => boolean;
}

export interface ErpTableActionEvent<T>
{
  action: ErpTableAction<T>;
  row: T;
}
