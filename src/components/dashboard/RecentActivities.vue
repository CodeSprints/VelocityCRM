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
    .slice(0, 5)
    .map((activity) => ({
      ...activity,
      contactName: crmStore.contactById(activity.contactId)?.name ?? '',
    })),
);
</script>

<template>
  <section class="app-card p-5" aria-labelledby="recent-activities-heading">
    <h2
      id="recent-activities-heading"
      class="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100"
    >
      {{ t('dashboard.recentActivity') }}
    </h2>
    <EmptyState v-if="activities.length === 0" :message="t('dashboard.noActivity')" />
    <ul v-else class="space-y-4">
      <li v-for="activity in activities" :key="activity.id" class="flex items-start gap-3">
        <span
          class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          <component :is="icons[activity.type]" class="h-4 w-4" aria-hidden="true" />
        </span>
        <div class="min-w-0">
          <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ activity.title }}</p>
          <p class="truncate text-xs text-slate-500 dark:text-slate-400">
            {{ activity.contactName }} · {{ formatDate(activity.date, locale) }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
