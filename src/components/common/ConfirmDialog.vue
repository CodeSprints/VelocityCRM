<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import BaseModal from '@/components/common/BaseModal.vue';

defineProps<{
  title?: string;
  message?: string;
}>();

const emit = defineEmits<{ confirm: []; cancel: [] }>();

const { t } = useI18n();
</script>

<template>
  <BaseModal
    title-id="confirm-dialog-title"
    :title="title ?? t('common.confirmDeleteTitle')"
    @close="emit('cancel')"
  >
    <p class="text-sm text-slate-600 dark:text-slate-300">
      {{ message ?? t('common.confirmDeleteMessage') }}
    </p>
    <div class="mt-6 flex justify-end gap-3">
      <button type="button" class="app-button-secondary" @click="emit('cancel')">
        {{ t('common.cancel') }}
      </button>
      <button type="button" class="app-button-danger" @click="emit('confirm')">
        {{ t('common.confirm') }}
      </button>
    </div>
  </BaseModal>
</template>
