<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import EmptyState from '@/components/common/EmptyState.vue';
import { useCrmStore } from '@/stores/crm';
import { formatDate } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();

const priorityClasses: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  high: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
};

const tasks = computed(() =>
  crmStore.tasks
    .filter((task) => task.status !== 'completed' && task.status !== 'cancelled')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5),
);
</script>

<template>
  <section class="app-card p-5" aria-labelledby="upcoming-tasks-heading">
    <h2 id="upcoming-tasks-heading" class="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
      {{ t('dashboard.upcomingTasks') }}
    </h2>
    <EmptyState v-if="tasks.length === 0" :message="t('dashboard.noTasks')" />
    <ul v-else class="space-y-3">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{{ task.title }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(task.dueDate, locale) }}</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
          :class="priorityClasses[task.priority]"
        >
          {{ t(`tasks.priority.${task.priority}`) }}
        </span>
      </li>
    </ul>
  </section>
</template>
