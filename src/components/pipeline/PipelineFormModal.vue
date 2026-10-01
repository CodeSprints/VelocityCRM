<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseModal from '@/components/common/BaseModal.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useIndustryStore } from '@/stores/industry';
import { useCrmStore } from '@/stores/crm';
import type { PipelineItem, PipelineStageId } from '@/types/domain';

const props = defineProps<{
  item?: PipelineItem | null;
  title: string;
}>();

const emit = defineEmits<{ close: []; submit: [payload: Omit<PipelineItem, 'id'>] }>();

const { t } = useI18n();
const { pipelineStageLabel } = useIndustryLabels();
const industryStore = useIndustryStore();
const crmStore = useCrmStore();

const form = reactive({
  title: props.item?.title ?? '',
  value: props.item?.value ?? 0,
  stage: (props.item?.stage ?? 'discovery') as PipelineStageId,
  probability: props.item?.probability ?? 25,
  contactId: props.item?.contactId ?? crmStore.contacts[0]?.id ?? '',
  expectedCloseDate: props.item?.expectedCloseDate ?? new Date().toISOString().slice(0, 10),
  notes: props.item?.notes ?? '',
});

const onSubmit = () => {
  emit('submit', { ...form });
};
</script>

<template>
  <BaseModal title-id="pipeline-form-title" :title="title" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="app-label" for="pipeline-title">{{ t('pipeline.fields.title') }}</label>
        <input id="pipeline-title" v-model="form.title" type="text" required class="app-input" />
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="app-label" for="pipeline-value">{{ t('pipeline.fields.value') }}</label>
          <input id="pipeline-value" v-model.number="form.value" type="number" min="0" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="pipeline-probability">{{ t('pipeline.fields.probability') }}</label>
          <input
            id="pipeline-probability"
            v-model.number="form.probability"
            type="number"
            min="0"
            max="100"
            class="app-input"
          />
        </div>
        <div>
          <label class="app-label" for="pipeline-stage">{{ t('pipeline.fields.stage') }}</label>
          <select id="pipeline-stage" v-model="form.stage" class="app-input">
            <option v-for="stage in industryStore.profile.pipelineStages" :key="stage.id" :value="stage.id">
              {{ pipelineStageLabel(stage.id) }}
            </option>
          </select>
        </div>
        <div>
          <label class="app-label" for="pipeline-contact">{{ t('pipeline.fields.contact') }}</label>
          <select id="pipeline-contact" v-model="form.contactId" class="app-input">
            <option v-for="contact in crmStore.contacts" :key="contact.id" :value="contact.id">
              {{ contact.name }}
            </option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="app-label" for="pipeline-date">{{ t('pipeline.fields.expectedCloseDate') }}</label>
          <input id="pipeline-date" v-model="form.expectedCloseDate" type="date" class="app-input" />
        </div>
      </div>
      <div>
        <label class="app-label" for="pipeline-notes">{{ t('pipeline.fields.notes') }}</label>
        <textarea id="pipeline-notes" v-model="form.notes" rows="3" class="app-input"></textarea>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="app-button-secondary" @click="emit('close')">
          {{ t('common.cancel') }}
        </button>
        <button type="submit" class="app-button-primary">{{ t('common.save') }}</button>
      </div>
    </form>
  </BaseModal>
</template>
