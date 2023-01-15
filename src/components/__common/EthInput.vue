<template>
  <div class="input">
    <EthLabel
      v-if="label"
      :value="label"
      :for="id"
    />
    <div class="input-wrapper">
      <input
        :id="id"
        ref="el"
        type="text"
        :value="modelValue"
        @input="handleInput"
      />
      <CopyButton
        v-if="canCopy"
        class="copy"
        :value="modelValue"
        compact
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed, ref } from 'vue';

import CopyButton from './CopyButton.vue';
import EthLabel from './EthLabel.vue';

withDefaults(
  defineProps<{
    modelValue: string;
    canCopy?: boolean;
    label?: string;
  }>(),
  {
    canCopy: false,
    label: '',
  },
);

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

.input-wrapper {
  display: flex;
  position: relative;
  align-items: center;
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

.copy {
  display: none;
  position: absolute;
  right: 10px;
}

input:focus ~ .copy,
.input-wrapper:hover .copy {
  display: initial;
}
</style>
