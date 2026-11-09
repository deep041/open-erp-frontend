import { Component, computed, inject, signal } from '@angular/core';
import { ErpDialogService, ErpTableActionEvent, ErpTableColumn, ErpTableComponent, ErpTableQuery, ErpToastService } from '../../../shared/ui';

interface DemoCustomer
{
  id: string;
  name: string;
  email: string;
  type: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-table-playground',
  imports: [ErpTableComponent],
  templateUrl: './table-playground.component.html',
  styleUrl: './table-playground.component.scss'
})

export class TablePlaygroundComponent {

  private readonly dialog = inject(ErpDialogService);
  private readonly toast = inject(ErpToastService);

  readonly getRowId = (row: DemoCustomer) => row.id;

  readonly query = signal<ErpTableQuery>({
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'name',
    sortDirection: 'asc',
  });

  readonly selectedIds = signal<string[]>([]);

  readonly customers = signal<DemoCustomer[]>(
    Array.from({ length: 47 }, (_, index) => ({
      id: `customer-${ index + 1 }`,
      name: `Customer ${ String(index + 1).padStart(2, '0') }`,
      email: `customer${ index + 1 }@example.com`,
      type: index % 2 === 0 ? 'Business' : 'Individual',
      status: index % 5 === 0 ? 'Inactive' : 'Active',
    })),
  );

  readonly columns: ErpTableColumn<DemoCustomer>[] = [
    {
      key: 'name',
      header: 'Customer',
      value: row => row.name,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      value: row => row.email,
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      value: row => row.type,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      value: row => row.status,
      type: 'badge',
      sortable: true,
      badgeColor: row =>
        row.status === 'Active' ? 'success' : 'neutral',
    },
  ];

  readonly actions = [
    { label: 'Edit' },
    { label: 'Delete', variant: 'danger' as const },
  ];

  readonly filteredRows = computed(() =>
  {
    const query = this.query();
    const term = query.search.trim().toLowerCase();

    const rows = this.customers().filter(row =>
      [row.name, row.email, row.type, row.status]
        .some(value => value.toLowerCase().includes(term)),
    );

    if (query.sortBy)
    {
      const column = this.columns.find(
        item => item.key === query.sortBy,
      );

      if (column)
      {
        rows.sort((a, b) =>
        {
          const aValue = String(column.value(a) ?? '');
          const bValue = String(column.value(b) ?? '');

          const result = aValue.localeCompare(bValue, undefined, {
            numeric: true,
            sensitivity: 'base',
          });

          return query.sortDirection === 'desc'
            ? -result
            : result;
        });
      }
    }

    return rows;
  });

  readonly pageRows = computed(() =>
  {
    const { page, pageSize } = this.query();
    const start = (page - 1) * pageSize;

    return this.filteredRows().slice(start, start + pageSize);
  });

  updateQuery(query: ErpTableQuery): void
  {
    this.query.set(query);
  }

  search(value: string): void
  {
    this.query.update(query => ({
      ...query,
      page: 1,
      search: value,
    }));
  }

  handleAction(event: ErpTableActionEvent<DemoCustomer>): void
  {
    if (event.action.label === 'Edit')
    {
      this.toast.info(
        'Edit customer',
        `Selected ${ event.row.name }`,
      );
      return;
    }

    if (event.action.label === 'Delete')
    {
      this.dialog.confirm({
        title: 'Delete customer?',
        message: `Delete ${ event.row.name } from the demo list?`,
        confirmText: 'Delete',
        variant: 'danger',
      }).subscribe(confirmed =>
      {
        if (!confirmed) return;

        this.customers.update(rows =>
          rows.filter(row => row.id !== event.row.id),
        );

        this.selectedIds.update(ids =>
          ids.filter(id => id !== event.row.id),
        );

        this.query.update(query => ({
          ...query,
          page: 1,
        }));

        this.toast.success('Customer deleted');
      });
    }
  }

}
