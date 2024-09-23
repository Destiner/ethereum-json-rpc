<template>
  <div class="radio">
    <EthLabel
      v-if="label"
      :value="label"
      :target="id"
      :disabled="disabled"
    />
    <RadioGroup.Root
      :model-value="selectedOption.value"
      @update:model-value="handleUpdate"
    >
      <div class="list">
        <RadioGroup.Item
          v-for="option in options"
          :key="option.value"
          as="template"
          :value="option.value"
        >
          <div
            :class="{ checked: option.value === modelValue }"
            class="option"
          >
            {{ option.label }}
          </div>
        </RadioGroup.Item>
      </div>
    </RadioGroup.Root>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup } from 'radix-vue/namespaced';
import { computed } from 'vue';

import EthLabel from './EthLabel.vue';

const { modelValue, options } = defineProps<{
  modelValue: string;
  options: Option[];
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const id = computed(() => `select-${Math.random().toString().substring(2)}`);

const selectedOption = computed<Option>(() => {
  return options.find((option) => option.value === modelValue) as Option;
});

function handleUpdate(value: string): void {
  emit('update:modelValue', value);
}
</script>

<script lang="ts">
interface Option {
  value: string;
  label: string;
}

// eslint-disable-next-line import-x/prefer-default-export
export type { Option };
</script>

<style scoped>
.radio {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.list {
  display: flex;
  gap: var(--spacing-normal);
}

.caption {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border-width: 0;
  white-space: nowrap;
}

.option {
  display: flex;
  position: relative;
  padding: 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-big);
  outline: none;
  cursor: pointer;
}

.option.checked {
  background: var(--color-bg-secondary);
}

.label {
  margin: 0;
  color: var(--color-text-secondary);
}

.option:hover > .label {
  color: var(--color-text-primary);
}

.label.checked {
  color: var(--color-text-primary);
}
</style>
