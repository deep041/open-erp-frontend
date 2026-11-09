import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

@Component({
  selector: 'erp-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpCheckboxComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpCheckboxComponent
  extends ErpControlBase<boolean> {

  override value = false;

  override updateValue(value: boolean): void
  {
    super.updateValue(value);
  }

  override markTouched(): void
  {
    super.markTouched();
  }

}
