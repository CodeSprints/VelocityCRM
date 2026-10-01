<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCrmStore } from '@/stores/crm';

const crmStore = useCrmStore();
const { t } = useI18n();

const form = reactive({
  name: crmStore.currentUser.name,
  email: crmStore.currentUser.email,
  role: crmStore.currentUser.role,
  department: crmStore.currentUser.department,
  phone: crmStore.currentUser.phone,
  timezone: crmStore.currentUser.timezone,
});

const onSubmit = () => {
  crmStore.updateCurrentUser({ ...form });
};
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-center gap-4">
      <img
        :src="crmStore.currentUser.avatar"
        :alt="crmStore.currentUser.name"
        class="h-16 w-16 rounded-full object-cover"
      />
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ t('profile.title') }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('profile.subtitle') }}</p>
      </div>
    </header>

    <form class="app-card grid grid-cols-1 gap-4 p-5 sm:grid-cols-2" @submit.prevent="onSubmit">
      <div>
        <label class="app-label" for="profile-name">{{ t('profile.fields.name') }}</label>
        <input id="profile-name" v-model="form.name" type="text" class="app-input" />
      </div>
      <div>
        <label class="app-label" for="profile-email">{{ t('profile.fields.email') }}</label>
        <input id="profile-email" v-model="form.email" type="email" class="app-input" />
      </div>
      <div>
        <label class="app-label" for="profile-role">{{ t('profile.fields.role') }}</label>
        <input id="profile-role" v-model="form.role" type="text" class="app-input" />
      </div>
      <div>
        <label class="app-label" for="profile-department">{{ t('profile.fields.department') }}</label>
        <input id="profile-department" v-model="form.department" type="text" class="app-input" />
      </div>
      <div>
        <label class="app-label" for="profile-phone">{{ t('profile.fields.phone') }}</label>
        <input id="profile-phone" v-model="form.phone" type="tel" class="app-input" />
      </div>
      <div>
        <label class="app-label" for="profile-timezone">{{ t('profile.fields.timezone') }}</label>
        <input id="profile-timezone" v-model="form.timezone" type="text" class="app-input" />
      </div>
      <div class="sm:col-span-2">
        <button type="submit" class="app-button-primary">{{ t('common.saveChanges') }}</button>
      </div>
    </form>
  </div>
</template>
