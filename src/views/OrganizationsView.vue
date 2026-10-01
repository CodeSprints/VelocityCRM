<script setup lang="ts">
import { ExternalLink, Plus, Trash2, Users } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import SearchField from '@/components/common/SearchField.vue';
import OrganizationFormModal from '@/components/organizations/OrganizationFormModal.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useCrmStore } from '@/stores/crm';
import type { Organization } from '@/types/domain';

const crmStore = useCrmStore();
const { t } = useI18n();
const { organizationSingular, organizationPlural } = useIndustryLabels();

const searchTerm = ref('');
const isFormOpen = ref(false);
const pendingDeleteId = ref<string | null>(null);

const filteredOrganizations = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (term.length === 0) return crmStore.organizations;
  return crmStore.organizations.filter(
    (organization) =>
      organization.name.toLowerCase().includes(term) || organization.category.toLowerCase().includes(term),
  );
});

const contactsFor = (organization: Organization) =>
  crmStore.contacts.filter((contact) => organization.contactIds.includes(contact.id));

const onSubmit = (payload: Omit<Organization, 'id' | 'contactIds'>) => {
  crmStore.addOrganization({ ...payload, contactIds: [] });
  isFormOpen.value = false;
};

const confirmDelete = () => {
  if (pendingDeleteId.value) {
    crmStore.deleteOrganization(pendingDeleteId.value);
    pendingDeleteId.value = null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {{ t('organizations.title', { plural: organizationPlural }) }}
        </h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('organizations.subtitle') }}</p>
      </div>
      <button type="button" class="app-button-primary" @click="isFormOpen = true">
        <Plus class="h-4 w-4" aria-hidden="true" />
        {{ t('organizations.addButton', { singular: organizationSingular }) }}
      </button>
    </header>

    <SearchField
      v-model="searchTerm"
      class="max-w-sm"
      :label="t('organizations.searchPlaceholder')"
      :placeholder="t('organizations.searchPlaceholder')"
    />

    <EmptyState v-if="filteredOrganizations.length === 0" :message="t('organizations.empty')" />

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="organization in filteredOrganizations"
        :key="organization.id"
        class="app-card flex flex-col gap-4 p-5"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <h2 class="truncate font-semibold text-slate-900 dark:text-slate-100">{{ organization.name }}</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ organization.category }}</p>
          </div>
          <div class="flex shrink-0 items-center gap-1">
            <a
              v-if="organization.website"
              :href="organization.website"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              :aria-label="organization.website"
            >
              <ExternalLink class="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
              :aria-label="t('a11y.removeItem', { name: organization.name })"
              @click="pendingDeleteId = organization.id"
            >
              <Trash2 class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <dl class="space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <dt class="text-slate-500 dark:text-slate-400">{{ t('organizations.fields.size') }}</dt>
            <dd class="font-medium text-slate-900 dark:text-slate-100">{{ organization.size || '—' }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-slate-500 dark:text-slate-400">{{ t('organizations.fields.revenue') }}</dt>
            <dd class="font-medium text-slate-900 dark:text-slate-100">{{ organization.revenue || '—' }}</dd>
          </div>
        </dl>

        <div
          class="flex items-center gap-2 border-t border-slate-100 pt-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
        >
          <Users class="h-4 w-4" aria-hidden="true" />
          <span>{{ contactsFor(organization).length }}</span>
        </div>
      </article>
    </div>

    <OrganizationFormModal
      v-if="isFormOpen"
      :title="t('organizations.addButton', { singular: organizationSingular })"
      @close="isFormOpen = false"
      @submit="onSubmit"
    />

    <ConfirmDialog v-if="pendingDeleteId" @cancel="pendingDeleteId = null" @confirm="confirmDelete" />
  </div>
</template>
