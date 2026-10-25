import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { PortfolioConfigService } from '../../config/portfolio-config.service';
import { ThemeToggleComponent } from '../../theme/theme-toggle.component';

interface NavLink {
  readonly label: string;
  readonly fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class HeaderComponent {
  protected readonly config = inject(PortfolioConfigService).config;
  protected readonly menuOpen = signal(false);

  protected readonly links: readonly NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Proyectos', fragment: 'proyectos' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
