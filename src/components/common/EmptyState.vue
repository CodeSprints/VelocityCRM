<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="app-card flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
    <p class="text-sm text-slate-500 dark:text-slate-400">{{ message }}</p>
  </div>
</template>
