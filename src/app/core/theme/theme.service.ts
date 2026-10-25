import { DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'rm-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.resolveInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => this.document.documentElement.setAttribute('data-theme', this.theme()));
  }

  toggle(): void {
    const next: Theme = this.isDark() ? 'light' : 'dark';
    this.theme.set(next);
    this.persist(next);
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // El almacenamiento puede estar bloqueado; se usa la preferencia del sistema.
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private persist(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Sin persistencia si el almacenamiento no está disponible.
    }
  }
}
