<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

import AccountMenu from '@/components/common/AccountMenu.vue';
import GlobalSearch from '@/components/common/GlobalSearch.vue';
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue';
import NotificationsMenu from '@/components/common/NotificationsMenu.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
const { t } = useI18n();
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
  >
    <div class="flex items-center gap-3 px-4 py-3 sm:px-6">
      <button
        type="button"
        class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        :aria-label="t('header.openMenu')"
        @click="uiStore.openMobileNav()"
      >
        <Menu class="h-5 w-5" aria-hidden="true" />
      </button>

      <router-link to="/" class="flex items-center gap-2">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-purple-600 font-bold text-white"
        >
          V
        </span>
        <span class="hidden text-lg font-bold text-slate-900 dark:text-slate-100 sm:inline">VelocityCRM</span>
      </router-link>

      <div class="ml-2 hidden flex-1 max-w-xl md:block">
        <GlobalSearch />
      </div>

      <div class="ml-auto flex items-center gap-1 sm:gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
        <NotificationsMenu />
        <AccountMenu />
      </div>
    </div>
    <div class="px-4 pb-3 md:hidden">
      <GlobalSearch />
    </div>
  </header>
</template>
