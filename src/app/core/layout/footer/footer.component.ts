import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getContactChannels } from '../../config/contact-channels';
import { PortfolioConfigService } from '../../config/portfolio-config.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly config = inject(PortfolioConfigService).config;
  protected readonly year = new Date().getFullYear();

  protected readonly channels = computed(() => {
    const config = this.config();
    return config ? getContactChannels(config.contact) : [];
  });
}
