import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ErpModule
{
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent
{
  readonly mobileMenuOpen = signal(false);

  readonly navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Modules', href: '#modules' },
    { label: 'Deployment', href: '#deployment' },
    { label: 'Developers', href: '#developers' }
  ];

  readonly modules: ErpModule[] = [
    {
      icon: 'chart',
      title: 'Accounting',
      description: 'Invoices, expenses, payments and financial reporting in one place.',
      color: 'purple'
    },
    {
      icon: 'users',
      title: 'CRM',
      description: 'Build customer relationships and manage your entire sales pipeline.',
      color: 'blue'
    },
    {
      icon: 'package',
      title: 'Inventory',
      description: 'Track products, warehouses, stock levels and movements.',
      color: 'orange'
    },
    {
      icon: 'shopping',
      title: 'Sales',
      description: 'Create quotations, manage orders and streamline your sales.',
      color: 'green'
    },
    {
      icon: 'briefcase',
      title: 'Human Resources',
      description: 'Manage employees, attendance, leave and HR operations.',
      color: 'pink'
    },
    {
      icon: 'tasks',
      title: 'Projects',
      description: 'Plan projects, organize tasks and collaborate with your team.',
      color: 'cyan'
    }
  ];

  readonly features = [
    {
      icon: '◈',
      title: 'Truly open source',
      description: 'Inspect, extend and contribute to the platform.'
    },
    {
      icon: '▦',
      title: 'Modular by design',
      description: 'Enable the business modules you actually need.'
    },
    {
      icon: '♧',
      title: 'Multi-organization',
      description: 'Secure tenant isolation and organization-level access.'
    },
    {
      icon: '⚡',
      title: 'Developer friendly',
      description: 'Modern APIs and an extensible architecture.'
    },
    {
      icon: '▣',
      title: 'Deploy anywhere',
      description: 'Designed for self-hosted and cloud environments.'
    },
    {
      icon: '◇',
      title: 'Customizable',
      description: 'Adapt workflows and modules to your business.'
    }
  ];

  toggleMenu(): void
  {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMenu(): void
  {
    this.mobileMenuOpen.set(false);
  }
}
