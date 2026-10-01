<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <a href="#main-content" class="skip-link">{{ t('header.skipToContent') }}</a>
</template>
