<template>
  <input
    ref="el"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed, ref } from 'vue';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const activeElement = useActiveElement();

const el = ref<HTMLInputElement | null>(null);

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
input {
  margin: 0;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
}
</style>
