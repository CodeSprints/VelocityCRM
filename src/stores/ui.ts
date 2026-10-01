import { defineStore } from 'pinia';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UiState {
  theme: ThemeMode;
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
}

const applyThemeClass = (theme: ThemeMode): void => {
  if (typeof document === 'undefined') return;
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', shouldUseDark);
};

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    theme: 'system',
    isSidebarOpen: true,
    isMobileNavOpen: false,
  }),
  getters: {
    isDark: (state) => {
      if (state.theme === 'system') {
        return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return state.theme === 'dark';
    },
  },
  actions: {
    setTheme(theme: ThemeMode) {
      this.theme = theme;
      applyThemeClass(theme);
    },
    toggleTheme() {
      const next = this.isDark ? 'light' : 'dark';
      this.setTheme(next);
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openMobileNav() {
      this.isMobileNavOpen = true;
    },
    closeMobileNav() {
      this.isMobileNavOpen = false;
    },
    syncThemeToDocument() {
      applyThemeClass(this.theme);
    },
  },
  persist: {
    key: 'velocitycrm-ui',
    pick: ['theme', 'isSidebarOpen'],
  },
});
