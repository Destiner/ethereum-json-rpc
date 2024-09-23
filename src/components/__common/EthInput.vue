<template>
  <div class="input">
    <EthLabel
      v-if="label"
      :value="label"
      :required
      :disabled
      :target="id"
    />
    <input
      :id
      ref="el"
      type="text"
      :class="{ error: hasError }"
      :value="modelValue"
      :disabled
      :placeholder
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed, useId, useTemplateRef } from 'vue';

import EthLabel from './EthLabel.vue';

const modelValue = defineModel<string>('modelValue');

const { label = '', placeholder = '' } = defineProps<{
  hasError?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  input: [value: string];
  blur: [];
}>();

const activeElement = useActiveElement();

const el = useTemplateRef('el');

const id = useId();
const isActive = computed(() => activeElement.value === el.value);

function focus(): void {
  if (el.value) {
    el.value.focus();
  }
}

function handleInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  modelValue.value = value;
  emit('input', value);
}

function handleBlur(): void {
  emit('blur');
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
  box-shadow: var(--shadow-small-inset);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
}

input:focus {
  border: 1px solid var(--color-border-secondary);
}

input:disabled {
  opacity: 0.6;
  pointer-events: none;
}

input.error {
  border: 1px solid var(--color-error);
}
</style>
