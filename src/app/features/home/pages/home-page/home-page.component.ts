import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PageMetaService } from '../../../../core/seo/page-meta.service';
import { FeaturedProjectsComponent } from '../../../projects';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, FeaturedProjectsComponent, ServicesSectionComponent, ContactSectionComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor() {
    inject(PageMetaService).set(
      'Robinson Montero · Soluciones digitales',
      'Desarrollo de software, automatización de procesos y dashboards con Power BI para optimizar tu negocio.',
    );
  }
}
