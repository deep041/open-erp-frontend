
import
  {
    ChangeDetectorRef,
    Directive,
    inject,
  } from '@angular/core';
import
  {
    ControlValueAccessor,
  } from '@angular/forms';

@Directive()
export abstract class ErpControlBase<T>
  implements ControlValueAccessor
{

  protected readonly cdr = inject(ChangeDetectorRef);

  value!: T;
  disabled = false;

  protected onChange: (value: T) => void = () => { };
  protected onTouched: () => void = () => { };

  writeValue(value: T): void
  {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: T) => void): void
  {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void
  {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void
  {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  protected updateValue(value: T): void
  {
    if (this.disabled) return;
    this.value = value;
    this.onChange(value);
    this.cdr.markForCheck();
  }

  protected markTouched(): void
  {
    this.onTouched();
  }
}
