<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useIndustryStore } from '@/stores/industry';
import { useCrmStore } from '@/stores/crm';
import { formatCurrency } from '@/utils/format';

const crmStore = useCrmStore();
const industryStore = useIndustryStore();
const { t, locale } = useI18n();
const { pipelineStageLabel, pipelineSingular } = useIndustryLabels();

const closedItems = computed(() =>
  crmStore.pipelineItems.filter((item) => item.stage === 'closed-won' || item.stage === 'closed-lost'),
);

const winRate = computed(() => {
  if (closedItems.value.length === 0) return 0;
  const won = closedItems.value.filter((item) => item.stage === 'closed-won').length;
  return Math.round((won / closedItems.value.length) * 100);
});

const conversionRate = computed(() => {
  if (crmStore.contacts.length === 0) return 0;
  return Math.round((crmStore.pipelineItems.length / crmStore.contacts.length) * 100);
});

const averageValue = computed(() => {
  if (crmStore.pipelineItems.length === 0) return 0;
  const total = crmStore.pipelineItems.reduce((sum, item) => sum + item.value, 0);
  return Math.round(total / crmStore.pipelineItems.length);
});

const stageBreakdown = computed(() =>
  industryStore.profile.pipelineStages.map((stage) => ({
    id: stage.id,
    label: pipelineStageLabel(stage.id),
    count: crmStore.pipelineItems.filter((item) => item.stage === stage.id).length,
  })),
);

const maxCount = computed(() => Math.max(1, ...stageBreakdown.value.map((stage) => stage.count)));
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('reports.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('reports.subtitle') }}</p>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="app-card p-5">
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('reports.conversionRate') }}</p>
        <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{{ conversionRate }}%</p>
      </div>
      <div class="app-card p-5">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ t('reports.averageDealValue', { singular: pipelineSingular }) }}
        </p>
        <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
          {{ formatCurrency(averageValue, locale) }}
        </p>
      </div>
      <div class="app-card p-5">
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('reports.winRate') }}</p>
        <p class="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{{ winRate }}%</p>
      </div>
    </div>

    <section class="app-card p-5" aria-labelledby="stage-breakdown-heading">
      <h2
        id="stage-breakdown-heading"
        class="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100"
      >
        {{ t('reports.stageBreakdown') }}
      </h2>
      <ul class="space-y-4">
        <li v-for="stage in stageBreakdown" :key="stage.id">
          <div class="mb-1 flex items-center justify-between text-sm">
            <span class="font-medium text-slate-700 dark:text-slate-200">{{ stage.label }}</span>
            <span class="text-slate-500 dark:text-slate-400">{{ stage.count }}</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              class="h-full rounded-full bg-brand-600"
              :style="{ width: `${(stage.count / maxCount) * 100}%` }"
            />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
