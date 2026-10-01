<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseModal from '@/components/common/BaseModal.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import type { Contact, RecordStatus } from '@/types/domain';

const props = defineProps<{
  contact?: Contact | null;
  title: string;
}>();

const emit = defineEmits<{ close: []; submit: [payload: Omit<Contact, 'id'>] }>();

const { t } = useI18n();
const { statusLabel } = useIndustryLabels();

const form = reactive({
  name: props.contact?.name ?? '',
  email: props.contact?.email ?? '',
  phone: props.contact?.phone ?? '',
  organization: props.contact?.organization ?? '',
  role: props.contact?.role ?? '',
  status: (props.contact?.status ?? 'cold') as RecordStatus,
  source: props.contact?.source ?? '',
  value: props.contact?.value ?? 0,
});

const onSubmit = () => {
  emit('submit', {
    ...form,
    avatar:
      props.contact?.avatar ??
      'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    lastContact: props.contact?.lastContact ?? new Date().toISOString().slice(0, 10),
  });
};
</script>

<template>
  <BaseModal title-id="contact-form-title" :title="title" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="app-label" for="contact-name">{{ t('contacts.fields.name') }}</label>
          <input id="contact-name" v-model="form.name" type="text" required class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-email">{{ t('contacts.fields.email') }}</label>
          <input id="contact-email" v-model="form.email" type="email" required class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-phone">{{ t('contacts.fields.phone') }}</label>
          <input id="contact-phone" v-model="form.phone" type="tel" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-organization">{{ t('contacts.fields.organization') }}</label>
          <input id="contact-organization" v-model="form.organization" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-role">{{ t('contacts.fields.role') }}</label>
          <input id="contact-role" v-model="form.role" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-status">{{ t('contacts.fields.status') }}</label>
          <select id="contact-status" v-model="form.status" class="app-input">
            <option value="hot">{{ statusLabel('hot') }}</option>
            <option value="warm">{{ statusLabel('warm') }}</option>
            <option value="cold">{{ statusLabel('cold') }}</option>
          </select>
        </div>
        <div>
          <label class="app-label" for="contact-source">{{ t('contacts.fields.source') }}</label>
          <input id="contact-source" v-model="form.source" type="text" class="app-input" />
        </div>
        <div>
          <label class="app-label" for="contact-value">{{ t('contacts.fields.value') }}</label>
          <input id="contact-value" v-model.number="form.value" type="number" min="0" class="app-input" />
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
