import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, LucideAngularModule, X } from 'lucide-angular';
import { ErpToastService, ErpToastType } from './toast.service';

@Component({
  selector: 'erp-toast-container',
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErpToastContainerComponent {

  readonly toastService = inject(ErpToastService);
  readonly X = X;

  getIcon(type: ErpToastType)
  {
    switch (type)
    {
      case 'success': return CheckCircle2;
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  }

}
