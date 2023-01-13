import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import ExecutionApi from './pages/ExecutionApi.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [{ path: '/', component: ExecutionApi }],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
