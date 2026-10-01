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
const { pipelineStageLabel } = useIndustryLabels();

const stageSummaries = computed(() =>
  industryStore.profile.pipelineStages.map((stage) => {
    const items = crmStore.pipelineItems.filter((item) => item.stage === stage.id);
    const total = items.reduce((sum, item) => sum + item.value, 0);
    return { id: stage.id, label: pipelineStageLabel(stage.id), count: items.length, total };
  }),
);

const maxTotal = computed(() => Math.max(1, ...stageSummaries.value.map((stage) => stage.total)));
</script>

<template>
  <section class="app-card p-5" aria-labelledby="pipeline-overview-heading">
    <h2
      id="pipeline-overview-heading"
      class="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100"
    >
      {{ t('dashboard.pipelineOverview') }}
    </h2>
    <ul class="space-y-4">
      <li v-for="stage in stageSummaries" :key="stage.id">
        <div class="mb-1 flex items-center justify-between text-sm">
          <span class="font-medium text-slate-700 dark:text-slate-200">{{ stage.label }}</span>
          <span class="text-slate-500 dark:text-slate-400"
            >{{ formatCurrency(stage.total, locale) }} · {{ stage.count }}</span
          >
        </div>
        <div
          class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="img"
          :aria-label="`${stage.label}: ${formatCurrency(stage.total, locale)}`"
        >
          <div
            class="h-full rounded-full bg-brand-600 transition-all"
            :style="{ width: `${(stage.total / maxTotal) * 100}%` }"
          />
        </div>
      </li>
    </ul>
  </section>
</template>
