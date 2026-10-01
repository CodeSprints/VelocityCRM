import { createI18n } from 'vue-i18n';

import en from '@/locales/en.json';
import pl from '@/locales/pl.json';

export type SupportedLocale = 'pl' | 'en';

const STORAGE_KEY = 'velocitycrm-locale';

const detectInitialLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return 'pl';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'pl' || stored === 'en') return stored;
  const browserLocale = window.navigator.language.slice(0, 2);
  return browserLocale === 'en' ? 'en' : 'pl';
};

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages: { pl, en },
});

export const setLocale = (locale: SupportedLocale): void => {
  i18n.global.locale.value = locale;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }
};
