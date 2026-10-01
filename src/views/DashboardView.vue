<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import PipelineOverview from '@/components/dashboard/PipelineOverview.vue';
import RecentActivities from '@/components/dashboard/RecentActivities.vue';
import StatsCards from '@/components/dashboard/StatsCards.vue';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks.vue';

const { t } = useI18n();
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('dashboard.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('dashboard.subtitle') }}</p>
    </header>

    <StatsCards />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <PipelineOverview class="lg:col-span-2" />
      <UpcomingTasks />
    </div>

    <RecentActivities />
  </div>
</template>
