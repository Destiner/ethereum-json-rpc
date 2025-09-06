import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Errors from './pages/Errors.vue';
import ExecutionApi from './pages/ExecutionApi.vue';
import ProviderChain from './pages/ProviderChain.vue';
import Providers from './pages/Providers.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', name: 'reference', component: ExecutionApi },
    { path: '/providers', name: 'providers', component: Providers },
    {
      path: '/provider/:provider-on-:chain',
      name: 'provider-chain',
      component: ProviderChain,
    },
    { path: '/errors', name: 'errors', component: Errors },
  ],
});

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

app.mount('#app');

export { routerHistory, router };
