<template>
  <div class="wrapper">
    <textarea
      :value="value"
      readonly
      spellcheck="false"
      :rows="compact ? 10 : 16"
      :class="{ error: isError }"
    />
    <CopyButton
      class="button"
      :value="value"
    />
    <div
      v-if="isLoading"
      class="loading"
    >
      <LoadingIndicator />
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyButton from './CopyButton.vue';
import LoadingIndicator from './LoadingIndicator.vue';

defineProps<{
  value: string;
  isLoading?: boolean;
  compact?: boolean;
  isError?: boolean;
}>();
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

.button {
  display: none;
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-bg-primary);
}

.wrapper:hover .button {
  display: initial;
}

.loading {
  position: absolute;
}
</style>
