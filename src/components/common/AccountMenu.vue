<script setup lang="ts">
import { HelpCircle, LogOut, Settings, User } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useClickOutside } from '@/composables/useClickOutside';
import { useCrmStore } from '@/stores/crm';

const crmStore = useCrmStore();
const router = useRouter();
const { t } = useI18n();
const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

useClickOutside(containerRef, () => {
  isOpen.value = false;
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const navigateTo = (name: string) => {
  router.push({ name });
  isOpen.value = false;
};
</script>

<template>
  <div ref="containerRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      :aria-label="t('header.account')"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <img
        :src="crmStore.currentUser.avatar"
        :alt="crmStore.currentUser.name"
        class="h-8 w-8 rounded-full object-cover"
      />
      <span class="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:inline">
        {{ crmStore.currentUser.name }}
      </span>
    </button>
    <div
      v-if="isOpen"
      role="menu"
      class="absolute right-0 top-full z-40 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
        <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ crmStore.currentUser.name }}</p>
        <p class="truncate text-xs text-slate-500 dark:text-slate-400">{{ crmStore.currentUser.email }}</p>
      </div>
      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="navigateTo('profile')"
      >
        <User class="h-4 w-4" aria-hidden="true" />
        {{ t('account.profile') }}
      </button>
      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="navigateTo('settings')"
      >
        <Settings class="h-4 w-4" aria-hidden="true" />
        {{ t('account.settings') }}
      </button>
      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="isOpen = false"
      >
        <HelpCircle class="h-4 w-4" aria-hidden="true" />
        {{ t('account.help') }}
      </button>
      <div class="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
        <button
          type="button"
          role="menuitem"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          @click="isOpen = false"
        >
          <LogOut class="h-4 w-4" aria-hidden="true" />
          {{ t('account.signOut') }}
        </button>
      </div>
    </div>
  </div>
</template>
