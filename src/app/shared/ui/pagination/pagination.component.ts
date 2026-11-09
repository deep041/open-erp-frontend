import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'erp-pagination',
  imports: [LucideAngularModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpPaginationComponent {

  readonly page = input(1);
  readonly pageSize = input(10);
  readonly total = input(0);
  readonly pageSizeOptions = input([10, 20, 50, 100]);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );

  readonly start = computed(() =>
    this.total() === 0
      ? 0
      : (this.page() - 1) * this.pageSize() + 1,
  );

  readonly end = computed(() =>
    Math.min(this.page() * this.pageSize(), this.total()),
  );

}
