<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFocusTrap } from '@/composables/useFocusTrap';

const props = defineProps<{
  titleId: string;
  title: string;
}>();

const emit = defineEmits<{ close: [] }>();

const { t } = useI18n();
const containerRef = ref<HTMLElement | null>(null);

useFocusTrap(containerRef, () => emit('close'));
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60" aria-hidden="true" @click="emit('close')" />
    <div
      ref="containerRef"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="props.titleId"
      class="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
    >
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 :id="props.titleId" class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ props.title }}
        </h2>
        <button
          type="button"
          class="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          :aria-label="t('a11y.closeModal')"
          @click="emit('close')"
        >
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
