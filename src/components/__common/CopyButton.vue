<template>
  <div
    class="button"
    :class="{ compact }"
    @click="copy"
  >
    <IconClipboard
      v-if="ready"
      class="icon"
      :class="{ compact }"
    />
    <IconSuccess
      v-else
      class="icon"
      :class="{ compact }"
    />
  </div>
</template>

<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
import { onMounted } from 'vue';

import IconClipboard from './icon/Clipboard.vue';
import IconSuccess from './icon/Success.vue';

const { value, compact = false } = defineProps<{
  value: string;
  compact?: boolean;
}>();

onMounted(() => {
  stop();
});

const { ready, start, stop } = useTimeout(2000, { controls: true });

function copy(): void {
  navigator.clipboard.writeText(value);
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

.button.compact {
  padding: 2px;
  border: none;
}

.icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
}

.icon.compact {
  width: 12px;
  height: 12px;
}
</style>
