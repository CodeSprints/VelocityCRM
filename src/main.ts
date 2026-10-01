import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import App from '@/App.vue';
import '@/assets/main.css';
import { i18n } from '@/i18n';
import { router } from '@/router';
import { useUiStore } from '@/stores/ui';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');

useUiStore().syncThemeToDocument();
