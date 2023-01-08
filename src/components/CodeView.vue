<template>
  <div class="wrapper">
    <textarea
      :value="value"
      readonly
      spellcheck="false"
      :rows="10"
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
import LoadingIndicator from './LoadingIndicator.vue';

defineProps<{
  value: string;
  isLoading: boolean;
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
  padding: 8px;
  overflow-y: scroll;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: 12px;
  resize: none;
}

.loading {
  position: absolute;
}
</style>
