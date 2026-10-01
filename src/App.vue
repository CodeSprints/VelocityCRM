<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterView, useRoute } from 'vue-router';
import { computed, watch } from 'vue';

import AppShell from '@/components/layout/AppShell.vue';

const route = useRoute();
const { t } = useI18n();

const pageTitle = computed(() => {
  const key = route.meta.titleKey as string | undefined;
  return key ? t(key) : 'VelocityCRM';
});

watch(
  pageTitle,
  (value) => {
    document.title = `${value} · VelocityCRM`;
  },
  { immediate: true },
);
</script>

<template>
  <AppShell>
    <RouterView v-slot="{ Component, route: currentRoute }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="currentRoute.fullPath" />
      </Transition>
    </RouterView>
  </AppShell>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
