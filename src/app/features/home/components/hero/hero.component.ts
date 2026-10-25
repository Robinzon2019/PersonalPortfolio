import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortfolioConfigService } from '../../../../core/config/portfolio-config.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TechnologyBadgeComponent } from '../../../../shared/ui/technology-badge/technology-badge.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ButtonComponent, TechnologyBadgeComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly config = inject(PortfolioConfigService).config;
}
