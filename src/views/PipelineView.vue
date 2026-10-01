<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import PipelineBoard from '@/components/pipeline/PipelineBoard.vue';
import PipelineFormModal from '@/components/pipeline/PipelineFormModal.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useCrmStore } from '@/stores/crm';
import type { PipelineItem } from '@/types/domain';

const crmStore = useCrmStore();
const { t } = useI18n();
const { pipelineSingular, pipelinePlural } = useIndustryLabels();

const isFormOpen = ref(false);
const editingItem = ref<PipelineItem | null>(null);
const pendingDelete = ref<PipelineItem | null>(null);

const openAdd = () => {
  editingItem.value = null;
  isFormOpen.value = true;
};

const openEdit = (item: PipelineItem) => {
  editingItem.value = item;
  isFormOpen.value = true;
};

const onSubmit = (payload: Omit<PipelineItem, 'id'>) => {
  if (editingItem.value) {
    crmStore.updatePipelineItem(editingItem.value.id, payload);
  } else {
    crmStore.addPipelineItem(payload);
  }
  isFormOpen.value = false;
};

const confirmDelete = () => {
  if (pendingDelete.value) {
    crmStore.deletePipelineItem(pendingDelete.value.id);
    pendingDelete.value = null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {{ t('pipeline.title', { plural: pipelinePlural }) }}
        </h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ t('pipeline.subtitle', { pluralLower: pipelinePlural.toLowerCase() }) }}
        </p>
      </div>
      <button type="button" class="app-button-primary" @click="openAdd">
        <Plus class="h-4 w-4" aria-hidden="true" />
        {{ t('pipeline.addButton', { singular: pipelineSingular }) }}
      </button>
    </header>

    <PipelineBoard @edit="openEdit" @remove="pendingDelete = $event" />

    <PipelineFormModal
      v-if="isFormOpen"
      :item="editingItem"
      :title="editingItem ? t('common.edit') : t('pipeline.addButton', { singular: pipelineSingular })"
      @close="isFormOpen = false"
      @submit="onSubmit"
    />

    <ConfirmDialog
      v-if="pendingDelete"
      :message="t('contacts.deleteConfirm', { name: pendingDelete.title })"
      @cancel="pendingDelete = null"
      @confirm="confirmDelete"
    />
  </div>
</template>
