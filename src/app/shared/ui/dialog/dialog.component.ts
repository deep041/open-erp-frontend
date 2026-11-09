import
  {
    DIALOG_DATA,
    DialogRef,
  } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertTriangle, Info, LucideAngularModule, X } from 'lucide-angular';

export interface ErpDialogData
{
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

@Component({
  selector: 'app-dialog',
  imports: [LucideAngularModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpDialogComponent {

  readonly data = inject<ErpDialogData>(DIALOG_DATA);
  readonly ref = inject(DialogRef<boolean, ErpDialogComponent>);

  readonly AlertTriangle = AlertTriangle;
  readonly Info = Info;
  readonly X = X;

}
