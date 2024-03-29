import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
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
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
