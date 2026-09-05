import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    tsconfigPaths: true,
  },
});
