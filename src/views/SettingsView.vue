<script setup lang="ts">
import { Monitor, Moon, Smartphone, Sun } from 'lucide-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue';
import IndustrySelector from '@/components/settings/IndustrySelector.vue';
import { useIndustryLabels } from '@/composables/useIndustryLabels';
import { useRuntimePlatform } from '@/composables/useRuntimePlatform';
import { useCrmStore } from '@/stores/crm';
import { useUiStore } from '@/stores/ui';
import type { ThemeMode } from '@/stores/ui';

const crmStore = useCrmStore();
const uiStore = useUiStore();
const { t } = useI18n();
const { pipelinePlural, contactPlural } = useIndustryLabels();
const { platform } = useRuntimePlatform();

const themeOptions: Array<{ id: ThemeMode; icon: typeof Sun; labelKey: string }> = [
  { id: 'light', icon: Sun, labelKey: 'theme.light' },
  { id: 'dark', icon: Moon, labelKey: 'theme.dark' },
  { id: 'system', icon: Monitor, labelKey: 'theme.system' },
];

const notificationChannels = computed(() => [
  { key: 'email' as const, label: t('settings.notificationChannels.email') },
  { key: 'push' as const, label: t('settings.notificationChannels.push') },
  {
    key: 'deals' as const,
    label: t('settings.notificationChannels.deals', { pluralLower: pipelinePlural.value.toLowerCase() }),
  },
  { key: 'tasks' as const, label: t('settings.notificationChannels.tasks') },
  {
    key: 'contacts' as const,
    label: t('settings.notificationChannels.contacts', { pluralLower: contactPlural.value.toLowerCase() }),
  },
]);

const toggleChannel = (key: 'email' | 'push' | 'deals' | 'tasks' | 'contacts') => {
  crmStore.updateCurrentUser({
    preferences: {
      ...crmStore.currentUser.preferences,
      notifications: {
        ...crmStore.currentUser.preferences.notifications,
        [key]: !crmStore.currentUser.preferences.notifications[key],
      },
    },
  });
};
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('settings.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('settings.subtitle') }}</p>
    </header>

    <section class="app-card space-y-4 p-5" aria-labelledby="industry-section-heading">
      <div>
        <h2 id="industry-section-heading" class="text-base font-semibold text-slate-900 dark:text-slate-100">
          {{ t('settings.industrySection') }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('settings.industryDescription') }}</p>
      </div>
      <IndustrySelector />
    </section>

    <section class="app-card space-y-4 p-5" aria-labelledby="appearance-section-heading">
      <div>
        <h2
          id="appearance-section-heading"
          class="text-base font-semibold text-slate-900 dark:text-slate-100"
        >
          {{ t('settings.appearanceSection') }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('settings.appearanceDescription') }}</p>
      </div>
      <div class="flex flex-wrap gap-3" role="radiogroup" :aria-label="t('settings.appearanceSection')">
        <button
          v-for="option in themeOptions"
          :key="option.id"
          type="button"
          role="radio"
          :aria-checked="uiStore.theme === option.id"
          class="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          :class="
            uiStore.theme === option.id
              ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
              : 'border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
          "
          @click="uiStore.setTheme(option.id)"
        >
          <component :is="option.icon" class="h-4 w-4" aria-hidden="true" />
          {{ t(option.labelKey) }}
        </button>
      </div>
    </section>

    <section class="app-card space-y-4 p-5" aria-labelledby="language-section-heading">
      <div>
        <h2 id="language-section-heading" class="text-base font-semibold text-slate-900 dark:text-slate-100">
          {{ t('settings.languageSection') }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('settings.languageDescription') }}</p>
      </div>
      <LocaleSwitcher />
    </section>

    <section class="app-card space-y-4 p-5" aria-labelledby="notifications-section-heading">
      <div>
        <h2
          id="notifications-section-heading"
          class="text-base font-semibold text-slate-900 dark:text-slate-100"
        >
          {{ t('settings.notificationsSection') }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('settings.notificationsDescription') }}</p>
      </div>
      <ul class="divide-y divide-slate-100 dark:divide-slate-800">
        <li
          v-for="channel in notificationChannels"
          :key="channel.key"
          class="flex items-center justify-between py-3"
        >
          <label :for="`notif-${channel.key}`" class="text-sm text-slate-700 dark:text-slate-300">{{
            channel.label
          }}</label>
          <input
            :id="`notif-${channel.key}`"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            :checked="crmStore.currentUser.preferences.notifications[channel.key]"
            @change="toggleChannel(channel.key)"
          />
        </li>
      </ul>
    </section>

    <section class="app-card space-y-3 p-5" aria-labelledby="platform-section-heading">
      <div>
        <h2 id="platform-section-heading" class="text-base font-semibold text-slate-900 dark:text-slate-100">
          {{ t('settings.platformSection') }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('settings.platformDescription') }}</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <Monitor v-if="platform === 'desktop'" class="h-4 w-4" aria-hidden="true" />
        <Smartphone v-else-if="platform === 'mobile'" class="h-4 w-4" aria-hidden="true" />
        <Sun v-else class="h-4 w-4" aria-hidden="true" />
        <span>{{ t('settings.currentPlatform') }}:</span>
        <span class="font-medium text-slate-900 dark:text-slate-100">
          {{
            platform === 'desktop'
              ? t('settings.platformDesktop')
              : platform === 'mobile'
                ? t('settings.platformMobile')
                : t('settings.platformWeb')
          }}
        </span>
      </div>
    </section>
  </div>
</template>
