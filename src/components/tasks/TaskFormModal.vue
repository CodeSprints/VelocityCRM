<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseModal from '@/components/common/BaseModal.vue';
import type { TaskItem, TaskPriority } from '@/types/domain';

const props = defineProps<{
  task?: TaskItem | null;
  title: string;
}>();

const emit = defineEmits<{ close: []; submit: [payload: Omit<TaskItem, 'id' | 'createdAt' | 'status'>] }>();

const { t } = useI18n();

const form = reactive({
  title: props.task?.title ?? '',
  description: props.task?.description ?? '',
  priority: (props.task?.priority ?? 'medium') as TaskPriority,
  assignedTo: props.task?.assignedTo ?? 'current-user',
  dueDate: props.task?.dueDate ?? new Date().toISOString().slice(0, 10),
});

const onSubmit = () => {
  emit('submit', { ...form });
};
</script>

<template>
  <BaseModal title-id="task-form-title" :title="title" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="app-label" for="task-title">{{ t('tasks.fields.title') }}</label>
        <input id="task-title" v-model="form.title" type="text" required class="app-input" />
      </div>
      <div>
        <label class="app-label" for="task-description">{{ t('tasks.fields.description') }}</label>
        <textarea id="task-description" v-model="form.description" rows="3" class="app-input"></textarea>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="app-label" for="task-priority">{{ t('tasks.fields.priority') }}</label>
          <select id="task-priority" v-model="form.priority" class="app-input">
            <option value="low">{{ t('tasks.priority.low') }}</option>
            <option value="medium">{{ t('tasks.priority.medium') }}</option>
            <option value="high">{{ t('tasks.priority.high') }}</option>
          </select>
        </div>
        <div>
          <label class="app-label" for="task-due-date">{{ t('tasks.fields.dueDate') }}</label>
          <input id="task-due-date" v-model="form.dueDate" type="date" class="app-input" />
        </div>
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
