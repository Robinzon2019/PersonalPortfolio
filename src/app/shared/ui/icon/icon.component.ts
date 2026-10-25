import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'code'
  | 'automation'
  | 'chart'
  | 'mail'
  | 'linkedin'
  | 'github'
  | 'whatsapp'
  | 'arrow-right'
  | 'arrow-left'
  | 'external';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
