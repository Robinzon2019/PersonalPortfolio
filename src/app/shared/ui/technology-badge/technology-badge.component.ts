import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-technology-badge',
  template: '{{ label() }}',
  styleUrl: './technology-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyBadgeComponent {
  readonly label = input.required<string>();
}
