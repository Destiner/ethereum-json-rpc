<template>
  <div class="input">
    <EthLabel
      v-if="label"
      :value="label"
      :for="id"
    />
    <input
      :id="id"
      ref="el"
      type="text"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed, ref } from 'vue';

import EthLabel from './EthLabel.vue';

defineProps<{
  modelValue: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const activeElement = useActiveElement();

const el = ref<HTMLInputElement | null>(null);

const id = computed(() => `input-${Math.random().toString().substring(2)}`);
const isActive = computed(() => activeElement.value === el.value);

function focus(): void {
  if (el.value) {
    el.value.focus();
  }
}

function handleInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}

defineExpose({
  isActive,
  focus,
});
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

input {
  width: 100%;
  margin: 0;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
}

input:focus {
  border: 1px solid var(--color-border-secondary);
}
</style>
