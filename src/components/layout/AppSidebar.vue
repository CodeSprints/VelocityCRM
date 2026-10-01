<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { navigationItems } from '@/config/navigation';

const { t } = useI18n();
const { contactPlural, organizationPlural, pipelinePlural } = useIndustryLabels();

const resolveLabel = (labelKey: string): string => {
  if (labelKey === 'nav.contacts') return t('nav.contacts', { plural: contactPlural.value });
  if (labelKey === 'nav.organizations') return t('nav.organizations', { plural: organizationPlural.value });
  if (labelKey === 'nav.pipeline') return t('nav.pipeline', { plural: pipelinePlural.value });
  return t(labelKey);
};
</script>

<template>
  <nav class="flex h-full flex-col gap-1 overflow-y-auto p-4" aria-label="Główna nawigacja">
    <router-link
      v-for="item in navigationItems"
      :key="item.to"
      :to="item.to"
      class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      active-class="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
      exact-active-class="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
    >
      <component :is="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{{ resolveLabel(item.labelKey) }}</span>
    </router-link>
  </nav>
</template>
