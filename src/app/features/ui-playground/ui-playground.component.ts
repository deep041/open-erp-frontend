import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErpButtonComponent, ErpCheckboxComponent, ErpInputComponent, ErpRadioGroupComponent, ErpSelectComponent, ErpSwitchComponent, ErpTextareaComponent } from '../../shared/ui';
import { ErpDialogService } from '../../shared/ui/dialog/dialog.service';
import { ErpToastService } from '../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-ui-playground',
  imports: [
    ReactiveFormsModule,
    ErpInputComponent,
    ErpTextareaComponent,
    ErpSelectComponent,
    ErpCheckboxComponent,
    ErpRadioGroupComponent,
    ErpSwitchComponent,
    JsonPipe,
    ErpButtonComponent
],
  templateUrl: './ui-playground.component.html',
  styleUrl: './ui-playground.component.scss'
})

export class UiPlaygroundComponent {

  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(ErpDialogService);
  private readonly toast = inject(ErpToastService);

  readonly businessTypes = [
    { label: 'Retail', value: 'retail' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Services', value: 'services' },
  ];

  readonly customerTypes = [
    {
      label: 'Individual',
      value: 'individual',
      description: 'Personal customer',
    },
    {
      label: 'Business',
      value: 'business',
      description: 'Company or organization',
    },
  ];

  readonly form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    businessType: [''],
    customerType: ['business'],
    notes: [''],
    isActive: [true],
    notifications: [false],
  });

  submit(): void
  {
    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    // this.toast.success(
    //   'Changes saved',
    //   'Your record has been updated.',
    // );

    this.showError();
    console.log('ERP Form:', this.form.getRawValue());
  }

  showError(): void
  {
    this.toast.error(
      'Something went wrong',
      'Please try again.',
    );
  }

  deleteCustomer(): void
  {
    this.dialog.confirm({
      title: 'Delete customer?',
      message: 'This action cannot be undone.',
      confirmText: 'Delete customer',
      variant: 'danger',
    }).subscribe(confirmed =>
    {
      if (!confirmed) return;

      // Call your delete API here.
    });
  }
}
