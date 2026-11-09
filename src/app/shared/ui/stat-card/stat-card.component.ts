import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})

export class StatCardComponent {

  readonly label = input.required<string>();
  readonly value = input<string | null>(null);
  readonly change = input<string | null>(null);
  readonly description = input('Not available yet');
  readonly icon = input<LucideIconData | null>(null);

  readonly TrendingUp = TrendingUp;

}
