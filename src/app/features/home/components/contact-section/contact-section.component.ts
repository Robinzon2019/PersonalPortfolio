import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { getContactChannels } from '../../../../core/config/contact-channels';
import { PortfolioConfigService } from '../../../../core/config/portfolio-config.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, ButtonComponent, IconComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly config = inject(PortfolioConfigService).config;

  protected readonly channels = computed(() => {
    const config = this.config();
    return config ? getContactChannels(config.contact) : [];
  });

  // El primer canal válido (el correo, si existe) es el destino de "Conversemos".
  protected readonly primaryChannel = computed(() => this.channels()[0] ?? null);
  protected readonly emailChannel = computed(() => this.channels().find((c) => c.id === 'email') ?? null);

  private readonly document = inject(DOCUMENT);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(2000)],
    }),
  });
  protected readonly submitted = signal(false);

  // Sin backend: abre el cliente de correo del visitante con el mensaje ya redactado.
  protected send(): void {
    const recipient = this.emailChannel();
    if (this.form.invalid || !recipient) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Contacto desde el portafolio: ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    this.document.defaultView?.location.assign(`${recipient.href}?subject=${subject}&body=${body}`);
    this.submitted.set(true);
  }
}
