
import { Injectable, signal } from '@angular/core';

export type ErpToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface ErpToast
{
  id: number;
  type: ErpToastType;
  title: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ErpToastService
{
  private nextId = 0;

  readonly toasts = signal<ErpToast[]>([]);

  show(
    type: ErpToastType,
    title: string,
    message = '',
    duration = 4500,
  ): void
  {
    const id = ++this.nextId;

    this.toasts.update(items => [
      ...items.slice(-3),
      { id, type, title, message },
    ]);

    if (duration > 0)
    {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  success(title: string, message = ''): void
  {
    this.show('success', title, message);
  }

  error(title: string, message = ''): void
  {
    this.show('error', title, message, 6000);
  }

  warning(title: string, message = ''): void
  {
    this.show('warning', title, message);
  }

  info(title: string, message = ''): void
  {
    this.show('info', title, message);
  }

  dismiss(id: number): void
  {
    this.toasts.update(items =>
      items.filter(item => item.id !== id),
    );
  }
}
