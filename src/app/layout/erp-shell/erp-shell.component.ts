import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-erp-shell',
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './erp-shell.component.html',
  styleUrl: './erp-shell.component.scss'
})

export class ErpShellComponent {
  readonly mobileOpen = signal(false);
}
