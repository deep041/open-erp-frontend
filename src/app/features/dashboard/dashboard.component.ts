import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity, ArrowUpRight, BarChart3, Building2, CalendarDays, LucideAngularModule, MoreHorizontal, ShoppingCart, Users } from 'lucide-angular';
import { AuthService } from '../../core/auth/auth.service';
import { StatCardComponent } from '../../shared/ui/stat-card/stat-card.component';
import { OrganizationService } from '../organizations/organization.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    RouterLink,
    StatCardComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  readonly auth = inject(AuthService);
  readonly organizations = inject(OrganizationService);

  readonly BarChart3 = BarChart3;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly Activity = Activity;
  readonly MoreHorizontal = MoreHorizontal;
  readonly ArrowUpRight = ArrowUpRight;
  readonly Building2 = Building2;
  readonly CalendarDays = CalendarDays;

  readonly todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  readonly greeting = computed(() =>
  {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

}
