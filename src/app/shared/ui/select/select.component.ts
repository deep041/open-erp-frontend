import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

export interface ErpSelectOption
{
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'erp-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpSelectComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErpSelectComponent
  extends ErpControlBase<string> {

  readonly inputId = input.required<string>();
  readonly label = input('');
  readonly placeholder = input('Select an option');
  readonly options = input.required<ErpSelectOption[]>();

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
