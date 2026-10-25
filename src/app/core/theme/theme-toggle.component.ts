import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [IconComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
}
