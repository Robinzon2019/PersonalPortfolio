import { IconName } from '../../shared/ui/icon/icon.component';

export interface BrandConfig {
  readonly initials: string;
  readonly tagline: string;
}

export interface HeroImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface HeroConfig {
  readonly eyebrow: string;
  readonly titlePrefix: string;
  readonly titleHighlight: string;
  readonly subtitle: string;
  readonly description: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly image: HeroImage;
  readonly technologies: readonly string[];
}

export interface ServiceConfig {
  readonly id: string;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface ContactConfig {
  readonly title: string;
  readonly text: string;
  readonly cta: string;
  readonly email: string;
  readonly linkedin: string;
  readonly github: string;
  readonly whatsapp: string;
}

export interface PortfolioConfig {
  readonly name: string;
  readonly brand: BrandConfig;
  readonly hero: HeroConfig;
  readonly services: readonly ServiceConfig[];
  readonly contact: ContactConfig;
}
