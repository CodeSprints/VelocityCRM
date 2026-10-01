<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseModal from '@/components/common/BaseModal.vue';
import type { Organization } from '@/types/domain';

const props = defineProps<{
  organization?: Organization | null;
  title: string;
}>();

const emit = defineEmits<{ close: []; submit: [payload: Omit<Organization, 'id' | 'contactIds'>] }>();

const { t } = useI18n();

const form = reactive({
  name: props.organization?.name ?? '',
  category: props.organization?.category ?? '',
  size: props.organization?.size ?? '',
  revenue: props.organization?.revenue ?? '',
  website: props.organization?.website ?? '',
});

const onSubmit = () => {
  emit('submit', { ...form });
};
</script>

<template>
  <BaseModal title-id="organization-form-title" :title="title" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label class="app-label" for="organization-name">{{ t('organizations.fields.name') }}</label>
          <input id="organization-name" v-model="form.name" type="text" required class="app-input" />
        </div>
        <div>
          <label class="app-label" for="organization-category">{{
            t('organizations.fields.category')
          }}</label>
          <input id="organization-category" v-model="form.category" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="organization-size">{{ t('organizations.fields.size') }}</label>
          <input id="organization-size" v-model="form.size" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="organization-revenue">{{ t('organizations.fields.revenue') }}</label>
          <input id="organization-revenue" v-model="form.revenue" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="organization-website">{{ t('organizations.fields.website') }}</label>
          <input id="organization-website" v-model="form.website" type="url" class="app-input" />
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
