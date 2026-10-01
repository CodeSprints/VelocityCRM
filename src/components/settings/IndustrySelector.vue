<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useIndustryStore } from '@/stores/industry';

const industryStore = useIndustryStore();
const { locale, t } = useI18n();
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <button
      v-for="profile in industryStore.profiles"
      :key="profile.id"
      type="button"
      class="app-card flex flex-col gap-2 p-4 text-left transition-shadow hover:shadow-md"
      :class="{ 'ring-2 ring-brand-500': profile.id === industryStore.activeIndustryId }"
      :aria-pressed="profile.id === industryStore.activeIndustryId"
      :aria-label="t('industry.switchTo', { name: profile.name[locale === 'en' ? 'en' : 'pl'] })"
      @click="industryStore.setIndustry(profile.id)"
    >
      <span class="flex items-center gap-2">
        <span
          class="h-3 w-3 rounded-full"
          :style="{ backgroundColor: profile.accentColor }"
          aria-hidden="true"
        />
        <span class="font-semibold text-slate-900 dark:text-slate-100">
          {{ profile.name[locale === 'en' ? 'en' : 'pl'] }}
        </span>
      </span>
      <span class="text-sm text-slate-500 dark:text-slate-400">
        {{ profile.description[locale === 'en' ? 'en' : 'pl'] }}
      </span>
    </button>
  </div>
</template>
