import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ArrowDown, ArrowUp, ArrowUpDown, Inbox, LucideAngularModule, MoreHorizontal, Search } from 'lucide-angular';
import { ErpPaginationComponent } from '../pagination/pagination.component';
import { ErpSortDirection, ErpTableAction, ErpTableActionEvent, ErpTableColumn, ErpTableQuery } from './table.types';

@Component({
  selector: 'erp-table',
  imports: [
    LucideAngularModule,
    ErpPaginationComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpTableComponent<T extends object> {

  readonly title = input('Records');
  readonly description = input('');
  readonly columns = input.required<ErpTableColumn<T>[]>();
  readonly rows = input.required<T[]>();
  readonly rowId = input.required<(row: T) => string>();

  readonly total = input(0);
  readonly loading = input(false);
  readonly searchable = input(true);
  readonly selectable = input(false);
  readonly actions = input<ErpTableAction<T>[]>([]);

  readonly query = input.required<ErpTableQuery>();

  readonly queryChange = output<ErpTableQuery>();
  readonly searchInput = output<string>();
  readonly selectionChange = output<string[]>();
  readonly actionClick = output<ErpTableActionEvent<T>>();

  // Controlled by the parent so selection survives page changes.
  readonly selectedIds = input<string[]>([]);

  readonly Search = Search;
  readonly ArrowUp = ArrowUp;
  readonly ArrowDown = ArrowDown;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Inbox = Inbox;
  readonly MoreHorizontal = MoreHorizontal;

  readonly columnCount = computed(() =>
    this.columns().length
    + (this.selectable() ? 1 : 0)
    + (this.actions().length ? 1 : 0),
  );

  readonly allSelected = computed(() =>
    this.rows().length > 0 &&
    this.rows().every(row =>
      this.selectedIds().includes(this.rowId()(row)),
    ),
  );

  readonly someSelected = computed(() =>
    !this.allSelected() &&
    this.rows().some(row =>
      this.selectedIds().includes(this.rowId()(row)),
    ),
  );

  toggleSort(key: string): void
  {
    const current = this.query();

    const direction: ErpSortDirection =
      current.sortBy === key &&
        current.sortDirection === 'asc'
        ? 'desc'
        : 'asc';

    this.queryChange.emit({
      ...current,
      page: 1,
      sortBy: key,
      sortDirection: direction,
    });
  }

  sortIcon(key: string)
  {
    if (this.query().sortBy !== key) return ArrowUpDown;
    return this.query().sortDirection === 'asc'
      ? ArrowUp
      : ArrowDown;
  }

  sortAria(column: ErpTableColumn<T>): string | null
  {
    if (!column.sortable) return null;
    if (this.query().sortBy !== column.key) return 'none';

    return this.query().sortDirection === 'asc'
      ? 'ascending'
      : 'descending';
  }

  changePage(page: number): void
  {
    this.queryChange.emit({
      ...this.query(),
      page,
    });
  }

  changePageSize(pageSize: number): void
  {
    this.queryChange.emit({
      ...this.query(),
      page: 1,
      pageSize,
    });
  }

  toggleRow(row: T, checked: boolean): void
  {
    const id = this.rowId()(row);
    const selected = new Set(this.selectedIds());

    if (checked) selected.add(id);
    else selected.delete(id);

    this.selectionChange.emit([...selected]);
  }

  toggleAll(checked: boolean): void
  {
    const selected = new Set(this.selectedIds());

    for (const row of this.rows())
    {
      const id = this.rowId()(row);

      if (checked) selected.add(id);
      else selected.delete(id);
    }

    this.selectionChange.emit([...selected]);
  }

}
