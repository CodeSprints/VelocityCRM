<script setup lang="ts">
import { Briefcase, CheckSquare, TrendingUp, Users } from 'lucide-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useCrmStore } from '@/stores/crm';
import { formatCurrency } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();
const { contactPlural, pipelinePlural } = useIndustryLabels();

const cards = computed(() => [
  {
    id: 'contacts',
    label: t('dashboard.statActiveContacts', { label: contactPlural.value }),
    value: crmStore.contacts.length.toString(),
    icon: Users,
    accent: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    id: 'pipeline',
    label: t('dashboard.statOpenPipeline', { label: pipelinePlural.value }),
    value: crmStore.openPipelineItems.length.toString(),
    icon: Briefcase,
    accent: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300',
  },
  {
    id: 'won',
    label: t('dashboard.statWonValue'),
    value: formatCurrency(crmStore.wonValue, locale.value),
    icon: TrendingUp,
    accent: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    id: 'tasks',
    label: t('dashboard.statTasksDueSoon'),
    value: crmStore.pendingTasksCount.toString(),
    icon: CheckSquare,
    accent: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300',
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <div v-for="card in cards" :key="card.id" class="app-card flex items-center gap-4 p-5">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" :class="card.accent">
        <component :is="card.icon" class="h-5 w-5" aria-hidden="true" />
      </span>
      <dl class="min-w-0">
        <dt class="truncate text-sm text-slate-500 dark:text-slate-400">{{ card.label }}</dt>
        <dd class="text-xl font-semibold text-slate-900 dark:text-slate-100">{{ card.value }}</dd>
      </dl>
    </div>
  </div>
</template>
