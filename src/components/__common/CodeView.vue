<template>
  <div class="wrapper">
    <textarea
      :value="value"
      readonly
      spellcheck="false"
      :rows="16"
      :class="{ error: isError }"
    />
    <div
      class="clipboard"
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
    <div
      v-if="isLoading"
      class="loading"
    >
      <LoadingIndicator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
import { onMounted } from 'vue';

import LoadingIndicator from './LoadingIndicator.vue';
import IconClipboard from './icon/Clipboard.vue';
import IconSuccess from './icon/Success.vue';

const props = withDefaults(
  defineProps<{
    value: string;
    isLoading: boolean;
    isError?: boolean;
  }>(),
  {
    isError: false,
  },
);

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
.wrapper {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

textarea {
  width: 100%;
  margin: 0;
  padding: 8px;
  overflow-y: scroll;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  resize: none;
}

textarea.error {
  border: 1px solid var(--color-error);
}

.clipboard {
  display: none;
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
}

.clipboard:hover {
  border: 1px solid var(--color-border-secondary);
}

.wrapper:hover .clipboard {
  display: initial;
}

.icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-secondary);
}

.loading {
  position: absolute;
}
</style>
