<script setup lang="ts">
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useIndustryStore } from '@/stores/industry';
import { useCrmStore } from '@/stores/crm';
import type { PipelineItem, PipelineStageId } from '@/types/domain';
import { formatCurrency } from '@/utils/format';

const emit = defineEmits<{ edit: [item: PipelineItem]; remove: [item: PipelineItem] }>();

const crmStore = useCrmStore();
const industryStore = useIndustryStore();
const { t, locale } = useI18n();
const { pipelineStageLabel } = useIndustryLabels();

const draggedId = ref<string | null>(null);

const stages = computed(() => industryStore.profile.pipelineStages);

const itemsForStage = (stageId: PipelineStageId) =>
  crmStore.pipelineItems.filter((item) => item.stage === stageId);

const stageTotal = (stageId: PipelineStageId) =>
  itemsForStage(stageId).reduce((sum, item) => sum + item.value, 0);

const moveStage = (item: PipelineItem, direction: 1 | -1) => {
  const currentIndex = stages.value.findIndex((stage) => stage.id === item.stage);
  const nextIndex = currentIndex + direction;
  const nextStage = stages.value[nextIndex];
  if (nextStage) {
    crmStore.updatePipelineItem(item.id, { stage: nextStage.id });
  }
};

const onDragStart = (item: PipelineItem) => {
  draggedId.value = item.id;
};

const onDrop = (stageId: PipelineStageId) => {
  if (draggedId.value) {
    crmStore.updatePipelineItem(draggedId.value, { stage: stageId });
    draggedId.value = null;
  }
};
</script>

<template>
  <div class="flex gap-4 overflow-x-auto pb-4">
    <section
      v-for="(stage, stageIndex) in stages"
      :key="stage.id"
      class="w-72 shrink-0"
      :aria-labelledby="`stage-heading-${stage.id}`"
      @dragover.prevent
      @drop="onDrop(stage.id)"
    >
      <div class="app-card flex h-full flex-col p-3">
        <div class="mb-3 flex items-center justify-between">
          <h2
            :id="`stage-heading-${stage.id}`"
            class="text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            {{ pipelineStageLabel(stage.id) }}
          </h2>
          <span class="text-xs text-slate-500 dark:text-slate-400">{{
            formatCurrency(stageTotal(stage.id), locale)
          }}</span>
        </div>
        <ul class="flex flex-1 flex-col gap-3">
          <li
            v-for="item in itemsForStage(stage.id)"
            :key="item.id"
            draggable="true"
            class="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            @dragstart="onDragStart(item)"
          >
            <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ item.title }}</p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ crmStore.contactById(item.contactId)?.name ?? '' }}
            </p>
            <p class="mt-2 text-sm font-semibold text-brand-700 dark:text-brand-400">
              {{ formatCurrency(item.value, locale) }}
            </p>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex gap-1">
                <button
                  type="button"
                  class="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-slate-800"
                  :disabled="stageIndex === 0"
                  :aria-label="t('pipeline.moveLeft')"
                  @click="moveStage(item, -1)"
                >
                  <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-slate-800"
                  :disabled="stageIndex === stages.length - 1"
                  :aria-label="t('pipeline.moveRight')"
                  @click="moveStage(item, 1)"
                >
                  <ChevronRight class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div class="flex gap-1">
                <button
                  type="button"
                  class="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  :aria-label="`${t('common.edit')}: ${item.title}`"
                  @click="emit('edit', item)"
                >
                  <Pencil class="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  :aria-label="t('a11y.removeItem', { name: item.title })"
                  @click="emit('remove', item)"
                >
                  <Trash2 class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
          <li
            v-if="itemsForStage(stage.id).length === 0"
            class="rounded-lg border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-slate-700"
          >
            {{ t('pipeline.empty') }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
