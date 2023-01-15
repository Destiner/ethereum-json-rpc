<template>
  <div
    class="button"
    @click="copy"
  >
    <IconClipboard
      v-if="ready"
      class="icon"
    />
    <IconSuccess
      v-else
      class="icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
import { onMounted } from 'vue';

import IconClipboard from './icon/Clipboard.vue';
import IconSuccess from './icon/Success.vue';

const props = defineProps<{
  value: string;
}>();

onMounted(() => {
  stop();
});

const { ready, start, stop } = useTimeout(2000, { controls: true });

function copy(): void {
  navigator.clipboard.writeText(props.value);
  start();
}
</script>

<style scoped>
.button {
  padding: 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
}

.button:hover {
  border: 1px solid var(--color-border-secondary);
}

.icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
}
</style>
