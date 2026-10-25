import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';
import { PageMetaService } from '../../seo/page-meta.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, ButtonComponent, EmptyStateComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  constructor() {
    inject(PageMetaService).set('Página no encontrada · Robinson Montero', 'La página que buscas no existe.');
  }
}
