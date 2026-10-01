<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
    <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">404</h1>
    <p class="text-lg font-medium text-slate-700 dark:text-slate-200">{{ t('notFound.title') }}</p>
    <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('notFound.message') }}</p>
    <router-link to="/" class="app-button-primary mt-2">{{ t('notFound.backHome') }}</router-link>
  </div>
</template>
