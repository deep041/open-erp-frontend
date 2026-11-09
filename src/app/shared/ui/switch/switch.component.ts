import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErpControlBase } from '../core/erp-control.base';

@Component({
  selector: 'erp-switch',
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: '../core/_controls.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ErpSwitchComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpSwitchComponent
  extends ErpControlBase<boolean> {

  readonly label = input.required<string>();
  readonly description = input('');

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
