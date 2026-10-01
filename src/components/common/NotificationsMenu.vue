<script setup lang="ts">
import { Bell } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useClickOutside } from '@/composables/useClickOutside';
import { formatRelativeToNow } from '@/utils/format';
import { useCrmStore } from '@/stores/crm';

const crmStore = useCrmStore();
const { t, locale } = useI18n();
const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

useClickOutside(containerRef, () => {
  isOpen.value = false;
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const onSelect = (id: string) => {
  crmStore.markNotificationRead(id);
};
</script>

<template>
  <div ref="containerRef" class="relative">
    <button
      type="button"
      class="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      :aria-label="t('header.notifications')"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <Bell class="h-5 w-5" aria-hidden="true" />
      <span
        v-if="crmStore.unreadNotificationsCount > 0"
        class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white"
      >
        {{ crmStore.unreadNotificationsCount }}
      </span>
    </button>
    <div
      v-if="isOpen"
      role="menu"
      class="absolute right-0 top-full z-40 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <p v-if="crmStore.notifications.length === 0" class="px-3 py-6 text-center text-sm text-slate-500">
        {{ t('dashboard.noActivity') }}
      </p>
      <button
        v-for="notification in crmStore.notifications"
        :key="notification.id"
        type="button"
        role="menuitem"
        class="flex w-full flex-col gap-1 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        :class="{ 'bg-brand-50/60 dark:bg-slate-800/60': !notification.isRead }"
        @click="onSelect(notification.id)"
      >
        <span class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ notification.title }}</span>
        <span class="text-xs text-slate-500 dark:text-slate-400">{{ notification.message }}</span>
        <span class="text-[11px] text-slate-400">{{
          formatRelativeToNow(notification.createdAt, locale)
        }}</span>
      </button>
    </div>
  </div>
</template>
