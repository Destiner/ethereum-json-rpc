import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import About from './pages/About.vue';
import Main from './pages/Main.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: About },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
