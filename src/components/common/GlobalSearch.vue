<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import SearchField from '@/components/common/SearchField.vue';
import { useClickOutside } from '@/composables/useClickOutside';
import { useCrmStore } from '@/stores/crm';

const crmStore = useCrmStore();
const router = useRouter();
const { t } = useI18n();

const searchTerm = ref('');
const containerRef = ref<HTMLElement | null>(null);
const isFocused = ref(false);

useClickOutside(containerRef, () => {
  isFocused.value = false;
});

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  route: string;
}

const results = computed<SearchResult[]>(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (term.length < 2) return [];

  const contactResults: SearchResult[] = crmStore.contacts
    .filter(
      (contact) => contact.name.toLowerCase().includes(term) || contact.email.toLowerCase().includes(term),
    )
    .map((contact) => ({
      id: contact.id,
      title: contact.name,
      subtitle: contact.organization,
      route: '/contacts',
    }));

  const organizationResults: SearchResult[] = crmStore.organizations
    .filter((organization) => organization.name.toLowerCase().includes(term))
    .map((organization) => ({
      id: organization.id,
      title: organization.name,
      subtitle: organization.category,
      route: '/organizations',
    }));

  const pipelineResults: SearchResult[] = crmStore.pipelineItems
    .filter((item) => item.title.toLowerCase().includes(term))
    .map((item) => ({ id: item.id, title: item.title, subtitle: item.stage, route: '/pipeline' }));

  return [...contactResults, ...organizationResults, ...pipelineResults].slice(0, 8);
});

const onSelect = (result: SearchResult) => {
  searchTerm.value = '';
  isFocused.value = false;
  router.push(result.route);
};
</script>

<template>
  <div ref="containerRef" class="relative w-full">
    <SearchField
      v-model="searchTerm"
      :label="t('header.searchPlaceholder')"
      :placeholder="t('header.searchPlaceholder')"
      @focus="isFocused = true"
    />
    <div
      v-if="isFocused && results.length > 0"
      role="listbox"
      class="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <button
        v-for="result in results"
        :key="`${result.route}-${result.id}`"
        type="button"
        role="option"
        aria-selected="false"
        class="flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
        @click="onSelect(result)"
      >
        <span class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ result.title }}</span>
        <span class="text-xs text-slate-500 dark:text-slate-400">{{ result.subtitle }}</span>
      </button>
    </div>
    <p
      v-else-if="isFocused && searchTerm.trim().length >= 2"
      class="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
    >
      {{ t('common.noResults') }}
    </p>
  </div>
</template>
