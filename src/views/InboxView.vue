<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import EmptyState from '@/components/common/EmptyState.vue';
import { useCrmStore } from '@/stores/crm';
import { formatDateTime } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();

const messages = computed(() =>
  [...crmStore.messages].sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()),
);
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('inbox.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('inbox.subtitle') }}</p>
    </header>

    <EmptyState v-if="messages.length === 0" :message="t('inbox.empty')" />

    <ul v-else class="app-card divide-y divide-slate-100 dark:divide-slate-800">
      <li
        v-for="message in messages"
        :key="message.id"
        class="flex items-start gap-3 p-4"
        :class="{ 'bg-brand-50/50 dark:bg-slate-800/40': !message.isRead }"
      >
        <button
          type="button"
          class="mt-1 rounded-md p-1 text-slate-400 hover:text-amber-500"
          :class="{ 'text-amber-500': message.isStarred }"
          :aria-pressed="message.isStarred"
          :aria-label="message.isStarred ? t('inbox.unstar') : t('inbox.star')"
          @click="crmStore.toggleMessageStar(message.id)"
        >
          <Star class="h-4 w-4" :fill="message.isStarred ? 'currentColor' : 'none'" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="min-w-0 flex-1 text-left"
          @click="crmStore.toggleMessageRead(message.id)"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="truncate font-medium text-slate-900 dark:text-slate-100">{{ message.senderName }}</p>
            <span class="shrink-0 text-xs text-slate-400">{{
              formatDateTime(message.receivedAt, locale)
            }}</span>
          </div>
          <p class="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{{ message.subject }}</p>
          <p class="truncate text-sm text-slate-500 dark:text-slate-400">{{ message.preview }}</p>
        </button>
      </li>
    </ul>
  </div>
</template>
