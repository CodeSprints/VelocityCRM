<script setup lang="ts">
import { computed } from 'vue';

import type { RecordStatus } from '@/types/domain';

const props = defineProps<{
  status: RecordStatus;
  label: string;
}>();

const colorClasses = computed(() => {
  switch (props.status) {
    case 'hot':
      return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
    case 'warm':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
  }
});
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
    :class="colorClasses"
  >
    {{ label }}
  </span>
</template>
