import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogoComponent {

  readonly variant = input<'full' | 'icon'>('full');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly link = input('/organizations');
  readonly brandName = input('Kriyven');

}
