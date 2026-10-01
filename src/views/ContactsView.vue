<script setup lang="ts">
import { Mail, Pencil, Phone, Plus, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import SearchField from '@/components/common/SearchField.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import ContactFormModal from '@/components/contacts/ContactFormModal.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useCrmStore } from '@/stores/crm';
import type { Contact, RecordStatus } from '@/types/domain';
import { formatCurrency, formatDate } from '@/utils/format';

const crmStore = useCrmStore();
const { t, locale } = useI18n();
const { contactSingular, contactPlural, statusLabel } = useIndustryLabels();

const searchTerm = ref('');
const statusFilter = ref<'all' | RecordStatus>('all');
const isFormOpen = ref(false);
const editingContact = ref<Contact | null>(null);
const pendingDeleteId = ref<string | null>(null);

const filteredContacts = computed(() =>
  crmStore.contacts.filter((contact) => {
    const term = searchTerm.value.trim().toLowerCase();
    const matchesTerm =
      term.length === 0 ||
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.organization.toLowerCase().includes(term);
    const matchesStatus = statusFilter.value === 'all' || contact.status === statusFilter.value;
    return matchesTerm && matchesStatus;
  }),
);

const openAddForm = () => {
  editingContact.value = null;
  isFormOpen.value = true;
};

const openEditForm = (contact: Contact) => {
  editingContact.value = contact;
  isFormOpen.value = true;
};

const onSubmit = (payload: Omit<Contact, 'id'>) => {
  if (editingContact.value) {
    crmStore.updateContact(editingContact.value.id, payload);
  } else {
    crmStore.addContact(payload);
  }
  isFormOpen.value = false;
};

const confirmDelete = () => {
  if (pendingDeleteId.value) {
    crmStore.deleteContact(pendingDeleteId.value);
    pendingDeleteId.value = null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {{ t('contacts.title', { plural: contactPlural }) }}
        </h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ t('contacts.subtitle', { pluralLower: contactPlural.toLowerCase() }) }}
        </p>
      </div>
      <button type="button" class="app-button-primary" @click="openAddForm">
        <Plus class="h-4 w-4" aria-hidden="true" />
        {{ t('contacts.addButton', { singular: contactSingular }) }}
      </button>
    </header>

    <div class="app-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <SearchField
        v-model="searchTerm"
        class="sm:max-w-sm"
        :label="t('contacts.searchPlaceholder')"
        :placeholder="t('contacts.searchPlaceholder')"
      />
      <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span class="sr-only">{{ t('common.filterByStatus') }}</span>
        <select v-model="statusFilter" class="app-input sm:w-44" :aria-label="t('common.filterByStatus')">
          <option value="all">{{ t('common.all') }}</option>
          <option value="hot">{{ statusLabel('hot') }}</option>
          <option value="warm">{{ statusLabel('warm') }}</option>
          <option value="cold">{{ statusLabel('cold') }}</option>
        </select>
      </label>
    </div>

    <EmptyState v-if="filteredContacts.length === 0" :message="t('contacts.empty')" />

    <div v-else class="app-card overflow-x-auto">
      <table class="w-full min-w-[720px] text-left text-sm">
        <caption class="sr-only">
          {{
            t('contacts.title', { plural: contactPlural })
          }}
        </caption>
        <thead
          class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400"
        >
          <tr>
            <th scope="col" class="px-4 py-3 font-medium">{{ t('contacts.fields.name') }}</th>
            <th scope="col" class="px-4 py-3 font-medium">{{ t('contacts.fields.organization') }}</th>
            <th scope="col" class="px-4 py-3 font-medium">{{ t('contacts.fields.status') }}</th>
            <th scope="col" class="px-4 py-3 font-medium">{{ t('contacts.fields.value') }}</th>
            <th scope="col" class="px-4 py-3 font-medium">{{ t('contacts.lastContact') }}</th>
            <th scope="col" class="px-4 py-3 font-medium text-right">{{ t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="contact in filteredContacts" :key="contact.id">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img :src="contact.avatar" :alt="contact.name" class="h-9 w-9 rounded-full object-cover" />
                <div class="min-w-0">
                  <p class="truncate font-medium text-slate-900 dark:text-slate-100">{{ contact.name }}</p>
                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <a
                      :href="`mailto:${contact.email}`"
                      class="inline-flex items-center gap-1 hover:text-brand-600"
                    >
                      <Mail class="h-3 w-3" aria-hidden="true" />
                      <span class="truncate">{{ contact.email }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ contact.organization }}</td>
            <td class="px-4 py-3">
              <StatusBadge :status="contact.status" :label="statusLabel(contact.status)" />
            </td>
            <td class="px-4 py-3 text-slate-700 dark:text-slate-300">
              {{ formatCurrency(contact.value, locale) }}
            </td>
            <td class="px-4 py-3 text-slate-500 dark:text-slate-400">
              {{ formatDate(contact.lastContact, locale) }}
            </td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-1">
                <a
                  :href="`tel:${contact.phone}`"
                  class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  :aria-label="`${t('contacts.fields.phone')}: ${contact.phone}`"
                >
                  <Phone class="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  :aria-label="`${t('common.edit')}: ${contact.name}`"
                  @click="openEditForm(contact)"
                >
                  <Pencil class="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  :aria-label="t('a11y.removeItem', { name: contact.name })"
                  @click="pendingDeleteId = contact.id"
                >
                  <Trash2 class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ContactFormModal
      v-if="isFormOpen"
      :contact="editingContact"
      :title="
        editingContact
          ? t('contacts.editTitle', { singular: contactSingular })
          : t('contacts.addTitle', { singular: contactSingular })
      "
      @close="isFormOpen = false"
      @submit="onSubmit"
    />

    <ConfirmDialog
      v-if="pendingDeleteId"
      :message="t('contacts.deleteConfirm', { name: crmStore.contactById(pendingDeleteId)?.name ?? '' })"
      @cancel="pendingDeleteId = null"
      @confirm="confirmDelete"
    />
  </div>
</template>
