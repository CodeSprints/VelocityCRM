<script setup lang="ts">
import { FileText, Plus, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useCrmStore } from '@/stores/crm';
import type { DocumentFile } from '@/types/domain';
import { formatDate } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();

const pendingDelete = ref<DocumentFile | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const onFilesSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;
  Array.from(files).forEach((file) => {
    crmStore.addDocument({
      name: file.name,
      category: 'Uploads',
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      updatedAt: new Date().toISOString().slice(0, 10),
      owner: crmStore.currentUser.name,
    });
  });
  if (fileInput.value) fileInput.value.value = '';
};

const confirmDelete = () => {
  if (pendingDelete.value) {
    crmStore.deleteDocument(pendingDelete.value.id);
    pendingDelete.value = null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('documents.title') }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('documents.subtitle') }}</p>
      </div>
      <label class="app-button-primary cursor-pointer">
        <Plus class="h-4 w-4" aria-hidden="true" />
        {{ t('documents.uploadButton') }}
        <input ref="fileInput" type="file" multiple class="sr-only" @change="onFilesSelected" />
      </label>
    </header>

    <EmptyState v-if="crmStore.documents.length === 0" :message="t('documents.empty')" />

    <ul v-else class="app-card divide-y divide-slate-100 dark:divide-slate-800">
      <li v-for="document in crmStore.documents" :key="document.id" class="flex items-center gap-4 p-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
        >
          <FileText class="h-5 w-5" aria-hidden="true" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium text-slate-900 dark:text-slate-100">{{ document.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ document.category }} · {{ document.size }} · {{ formatDate(document.updatedAt, locale) }}
          </p>
        </div>
        <button
          type="button"
          class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          :aria-label="t('a11y.removeItem', { name: document.name })"
          @click="pendingDelete = document"
        >
          <Trash2 class="h-4 w-4" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <ConfirmDialog
      v-if="pendingDelete"
      :message="t('contacts.deleteConfirm', { name: pendingDelete.name })"
      @cancel="pendingDelete = null"
      @confirm="confirmDelete"
    />
  </div>
</template>
