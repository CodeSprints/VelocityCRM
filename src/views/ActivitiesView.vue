<script setup lang="ts">
import { Calendar, Mail, Phone, Users } from 'lucide-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import EmptyState from '@/components/common/EmptyState.vue';
import { useCrmStore } from '@/stores/crm';
import { formatDate } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();

const icons = { call: Phone, email: Mail, meeting: Users, task: Calendar } as const;

const activities = computed(() =>
  [...crmStore.activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((activity) => ({ ...activity, contactName: crmStore.contactById(activity.contactId)?.name ?? '' })),
);
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('activities.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('activities.subtitle') }}</p>
    </header>

    <EmptyState v-if="activities.length === 0" :message="t('activities.empty')" />

    <ol v-else class="app-card relative space-y-6 p-6">
      <li v-for="activity in activities" :key="activity.id" class="relative flex gap-4 pl-2">
        <span
          class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          <component :is="icons[activity.type]" class="h-4 w-4" aria-hidden="true" />
        </span>
        <div class="min-w-0">
          <p class="text-xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
            {{ t(`activities.type.${activity.type}`) }}
          </p>
          <p class="font-medium text-slate-900 dark:text-slate-100">{{ activity.title }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ activity.notes }}</p>
          <p class="mt-1 text-xs text-slate-400">
            {{ activity.contactName }} · {{ formatDate(activity.date, locale) }}
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>
