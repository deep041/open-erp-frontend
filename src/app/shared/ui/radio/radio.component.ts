import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

export interface ErpRadioOption
{
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

let nextRadioId = 0;

@Component({
  selector: 'erp-radio-group',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpRadioGroupComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpRadioGroupComponent
  extends ErpControlBase<string> {

  readonly label = input('');
  readonly variant = input<'card' | 'compact'>('card');
  readonly vertical = input(false);
  readonly options = input.required<ErpRadioOption[]>();

  readonly groupName = `erp-radio-${ ++nextRadioId }`;

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
