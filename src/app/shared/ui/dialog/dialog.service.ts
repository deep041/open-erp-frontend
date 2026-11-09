
import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import
  {
    ErpDialogComponent,
    ErpDialogData,
  } from './dialog.component';

@Injectable({ providedIn: 'root' })
export class ErpDialogService
{
  private readonly dialog = inject(Dialog);

  confirm(data: ErpDialogData): Observable<boolean>
  {
    const ref = this.dialog.open<boolean>(
      ErpDialogComponent,
      {
        data,
        disableClose: false,
        ariaLabelledBy: 'erp-dialog-title',
        ariaDescribedBy: 'erp-dialog-message',
        panelClass: 'erp-dialog-panel',
      },
    );

    return ref.closed.pipe(
      take(1),
      map(result => result === true),
    );
  }
}
