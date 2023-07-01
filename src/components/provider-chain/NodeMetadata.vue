<template>
  <div class="wrapper">
    <EthLabel :value="'Node metadata'" />
    <div
      class="box"
      @click="copy"
    >
      {{ metadata }}
      <IconClipboard
        v-if="ready"
        class="icon"
      />
      <IconSuccess
        v-else
        class="icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
import { onMounted } from 'vue';

import EthLabel from '@/components/__common/EthLabel.vue';
import IconClipboard from '@/components/__common/icon/Clipboard.vue';
import IconSuccess from '@/components/__common/icon/Success.vue';

const props = defineProps<{
  metadata: string;
}>();

onMounted(() => {
  stop();
});

const { ready, start, stop } = useTimeout(2000, { controls: true });

function copy(): void {
  navigator.clipboard.writeText(props.metadata);
  start();
}
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.box {
  display: flex;
  align-items: center;
  height: 30px;
  gap: var(--spacing-normal);
  padding: 4px 8px;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  cursor: pointer;
}

.box:hover {
  border: 1px solid var(--color-border-secondary);
  color: var(--color-text-primary);
}

.icon {
  width: 12px;
  height: 12px;
}
</style>
