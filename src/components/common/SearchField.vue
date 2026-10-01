<script setup lang="ts">
import { Search } from 'lucide-vue-next';

defineOptions({ inheritAttrs: false });

const model = defineModel<string>({ default: '' });

defineProps<{
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <label class="relative block">
    <span class="sr-only">{{ label }}</span>
    <Search
      class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    />
    <input v-model="model" type="search" :placeholder="placeholder" class="app-input pl-10" v-bind="$attrs" />
  </label>
</template>
