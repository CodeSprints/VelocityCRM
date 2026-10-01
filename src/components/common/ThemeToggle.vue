<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
const { t } = useI18n();
</script>

<template>
  <button
    type="button"
    class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
    :aria-label="t('header.toggleTheme')"
    :aria-pressed="uiStore.isDark"
    @click="uiStore.toggleTheme()"
  >
    <Sun v-if="uiStore.isDark" class="h-5 w-5" aria-hidden="true" />
    <Moon v-else class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
