<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import AppSidebar from '@/components/layout/AppSidebar.vue';
import { useFocusTrap } from '@/composables/useFocusTrap';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
const route = useRoute();
const { t } = useI18n();
const containerRef = ref<HTMLElement | null>(null);

useFocusTrap(containerRef, () => uiStore.closeMobileNav());

watch(
  () => route.fullPath,
  () => uiStore.closeMobileNav(),
);
</script>

<template>
  <div v-if="uiStore.isMobileNavOpen" class="fixed inset-0 z-50 lg:hidden">
    <div class="absolute inset-0 bg-slate-900/60" aria-hidden="true" @click="uiStore.closeMobileNav()" />
    <div
      ref="containerRef"
      role="dialog"
      aria-modal="true"
      aria-label="Menu nawigacyjne"
      class="relative z-10 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl dark:bg-slate-950"
    >
      <div
        class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800"
      >
        <span class="text-lg font-bold text-slate-900 dark:text-slate-100">VelocityCRM</span>
        <button
          type="button"
          class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          :aria-label="t('header.closeMenu')"
          @click="uiStore.closeMobileNav()"
        >
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <AppSidebar class="flex-1" />
    </div>
  </div>
</template>
