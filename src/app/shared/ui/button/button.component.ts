import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline-light';

/** Aplica la apariencia de botón a un `<button>` o `<a>` nativo. */
@Component({
  selector: 'button[appButton], a[appButton]',
  template: '<ng-content />',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn',
    '[class.btn--primary]': "variant() === 'primary'",
    '[class.btn--secondary]': "variant() === 'secondary'",
    '[class.btn--light]': "variant() === 'light'",
    '[class.btn--outline-light]': "variant() === 'outline-light'",
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
}
