<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { primaryMobileNavigation } from '@/config/navigation';

const { t } = useI18n();
const { contactPlural, pipelinePlural } = useIndustryLabels();

const resolveLabel = (labelKey: string): string => {
  if (labelKey === 'nav.contacts') return t('nav.contacts', { plural: contactPlural.value });
  if (labelKey === 'nav.pipeline') return t('nav.pipeline', { plural: pipelinePlural.value });
  return t(labelKey);
};
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-safe backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
    aria-label="Skrócona nawigacja"
  >
    <ul class="flex items-stretch justify-between px-2">
      <li v-for="item in primaryMobileNavigation" :key="item.to" class="flex-1">
        <router-link
          :to="item.to"
          class="flex flex-col items-center gap-0.5 px-1 py-2 text-[11px] font-medium text-slate-500 dark:text-slate-400"
          active-class="text-brand-600 dark:text-brand-400"
          exact-active-class="text-brand-600 dark:text-brand-400"
        >
          <component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
          <span class="truncate">{{ resolveLabel(item.labelKey) }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
