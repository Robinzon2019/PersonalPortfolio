import { toHttpUrl } from '../../shared/utils/url';
import { IconName } from '../../shared/ui/icon/icon.component';
import { ContactConfig } from './portfolio.model';

export interface ContactChannel {
  readonly id: 'email' | 'linkedin' | 'github' | 'whatsapp';
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
  readonly external: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function profileUrl(value: string, domain: string): string | null {
  const href = toHttpUrl(value);
  if (!href) {
    return null;
  }
  const host = new URL(href).hostname.toLowerCase();
  return host === domain || host.endsWith(`.${domain}`) ? href : null;
}

/** Devuelve solo los canales con datos válidos. */
export function getContactChannels(contact: ContactConfig): ContactChannel[] {
  const channels: ContactChannel[] = [];

  const email = contact.email.trim();
  if (EMAIL_PATTERN.test(email)) {
    channels.push({ id: 'email', label: 'Correo', href: `mailto:${email}`, icon: 'mail', external: false });
  }

  const linkedin = profileUrl(contact.linkedin, 'linkedin.com');
  if (linkedin) {
    channels.push({ id: 'linkedin', label: 'LinkedIn', href: linkedin, icon: 'linkedin', external: true });
  }

  const github = profileUrl(contact.github, 'github.com');
  if (github) {
    channels.push({ id: 'github', label: 'GitHub', href: github, icon: 'github', external: true });
  }

  const phone = contact.whatsapp.replace(/[\s()+-]/g, '');
  if (/^\d{8,15}$/.test(phone)) {
    channels.push({ id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${phone}`, icon: 'whatsapp', external: true });
  }

  return channels;
}
