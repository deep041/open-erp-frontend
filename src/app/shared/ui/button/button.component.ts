import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'erp-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpButtonComponent {

  readonly variant = input<
    'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  >('primary');

  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly fullWidth = input(false);

}
