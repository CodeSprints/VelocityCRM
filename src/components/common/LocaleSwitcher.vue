<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { setLocale } from '@/i18n';

const { locale } = useI18n();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  setLocale(target.value === 'en' ? 'en' : 'pl');
};
</script>

<template>
  <label class="inline-flex items-center gap-2 text-sm">
    <span class="sr-only">Język / Language</span>
    <select
      class="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      :value="locale"
      @change="onChange"
    >
      <option value="pl">PL</option>
      <option value="en">EN</option>
    </select>
  </label>
</template>
