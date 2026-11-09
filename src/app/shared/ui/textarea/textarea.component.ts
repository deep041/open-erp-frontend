import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

@Component({
  selector: 'erp-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpTextareaComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErpTextareaComponent
  extends ErpControlBase<string> {

  readonly inputId = input.required<string>();
  readonly label = input('');
  readonly placeholder = input('');
  readonly hint = input('');
  readonly rows = input(4);

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
