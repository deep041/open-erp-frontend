import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

@Component({
  selector: 'erp-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpInputComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpInputComponent
  extends ErpControlBase<string> {

  readonly inputId = input.required<string>();
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'password' | 'tel' | 'url'>('text');
  readonly hint = input('');
  readonly required = input(false);
  readonly invalid = input(false);
  readonly autocomplete = input('off');

  override value = '';

  override updateValue(value: string): void
  {
    super.updateValue(value);
  }

  override markTouched(): void
  {
    super.markTouched();
  }
}
