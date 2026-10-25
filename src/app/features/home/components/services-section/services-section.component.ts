import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioConfigService } from '../../../../core/config/portfolio-config.service';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-services-section',
  imports: [IconComponent, SectionHeadingComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent {
  protected readonly config = inject(PortfolioConfigService).config;
}
