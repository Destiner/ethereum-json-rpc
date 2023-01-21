<template>
  <div class="input">
    <EthLabel
      v-if="label"
      :value="label"
      :required="required"
      :disabled="disabled"
      :target="id"
    />
    <input
      :id="id"
      ref="el"
      type="text"
      :class="{ error: hasError }"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed, ref } from 'vue';

import EthLabel from './EthLabel.vue';

withDefaults(
  defineProps<{
    modelValue: string;
    hasError?: boolean;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
  }>(),
  {
    label: '',
    placeholder: '',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'blur'): void;
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
