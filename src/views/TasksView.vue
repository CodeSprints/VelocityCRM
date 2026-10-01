<script setup lang="ts">
import { Plus, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import TaskFormModal from '@/components/tasks/TaskFormModal.vue';
import { useCrmStore } from '@/stores/crm';
import type { TaskItem, TaskStatus } from '@/types/domain';
import { formatDate } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();

const statusFilter = ref<'all' | TaskStatus>('all');
const isFormOpen = ref(false);
const pendingDelete = ref<TaskItem | null>(null);

const filteredTasks = computed(() => {
  const tasks =
    statusFilter.value === 'all'
      ? crmStore.tasks
      : crmStore.tasks.filter((task) => task.status === statusFilter.value);
  return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
});

const priorityClasses: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  high: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
};

const toggleComplete = (task: TaskItem) => {
  crmStore.updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' });
};

const onSubmit = (payload: Omit<TaskItem, 'id' | 'createdAt' | 'status'>) => {
  crmStore.addTask({ ...payload, status: 'pending', createdAt: new Date().toISOString().slice(0, 10) });
  isFormOpen.value = false;
};

const confirmDelete = () => {
  if (pendingDelete.value) {
    crmStore.deleteTask(pendingDelete.value.id);
    pendingDelete.value = null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('tasks.title') }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('tasks.subtitle') }}</p>
      </div>
      <button type="button" class="app-button-primary" @click="isFormOpen = true">
        <Plus class="h-4 w-4" aria-hidden="true" />
        {{ t('tasks.addButton') }}
      </button>
    </header>

    <div class="app-card p-4">
      <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="sr-only">{{ t('common.filterByStatus') }}</span>
        <select v-model="statusFilter" class="app-input sm:w-56" :aria-label="t('common.filterByStatus')">
          <option value="all">{{ t('common.all') }}</option>
          <option value="pending">{{ t('tasks.status.pending') }}</option>
          <option value="in-progress">{{ t('tasks.status.in-progress') }}</option>
          <option value="completed">{{ t('tasks.status.completed') }}</option>
          <option value="cancelled">{{ t('tasks.status.cancelled') }}</option>
        </select>
      </label>
    </div>

    <EmptyState v-if="filteredTasks.length === 0" :message="t('tasks.empty')" />

    <ul v-else class="space-y-3">
      <li v-for="task in filteredTasks" :key="task.id" class="app-card flex items-start gap-4 p-4">
        <input
          :id="`task-checkbox-${task.id}`"
          type="checkbox"
          class="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          :checked="task.status === 'completed'"
          :aria-label="task.status === 'completed' ? t('tasks.markPending') : t('tasks.markComplete')"
          @change="toggleComplete(task)"
        />
        <div class="min-w-0 flex-1">
          <label :for="`task-checkbox-${task.id}`" class="block cursor-pointer">
            <p
              class="font-medium text-slate-900 dark:text-slate-100"
              :class="{ 'line-through text-slate-400 dark:text-slate-500': task.status === 'completed' }"
            >
              {{ task.title }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ task.description }}</p>
          </label>
          <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span class="rounded-full px-2 py-0.5 font-semibold" :class="priorityClasses[task.priority]">
              {{ t(`tasks.priority.${task.priority}`) }}
            </span>
            <span class="text-slate-500 dark:text-slate-400">{{ formatDate(task.dueDate, locale) }}</span>
          </div>
        </div>
        <button
          type="button"
          class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          :aria-label="t('a11y.removeItem', { name: task.title })"
          @click="pendingDelete = task"
        >
          <Trash2 class="h-4 w-4" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <TaskFormModal
      v-if="isFormOpen"
      :title="t('tasks.addButton')"
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
