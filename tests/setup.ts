import { config } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';

import en from '@/locales/en.json';
import pl from '@/locales/pl.json';

const testI18n = createI18n({
  legacy: false,
  locale: 'pl',
  fallbackLocale: 'en',
  messages: { pl, en },
});

config.global.plugins.push(testI18n);

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
