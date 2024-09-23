<template>
  <div class="select">
    <EthLabel
      v-if="label"
      :value="label"
      :target="id"
      :disabled
    />
    <div>
      <Select.Root
        :model-value="selectedOption.value"
        @update:model-value="handleUpdate"
      >
        <Select.Trigger
          :id
          class="trigger"
          :class="{ disabled }"
        >
          <Select.Value placeholder="Select…" />
          <IconChevronDown class="trigger-icon" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            :side-offset="4"
            position="popper"
          >
            <div class="pane">
              <Select.Viewport>
                <Select.Group>
                  <Select.Item
                    v-for="(option, index) in options"
                    :key="index"
                    class="item"
                    :value="option.value"
                  >
                    <Select.ItemText>
                      {{ option.label }}
                    </Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
            </div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select } from 'radix-vue/namespaced';
import { computed, useId } from 'vue';

import IconChevronDown from '@/components/__common/icon/ChevronDown.vue';

import EthLabel from './EthLabel.vue';

const { modelValue, options } = defineProps<{
  modelValue: string;
  options: Option[];
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const id = useId();

const selectedOption = computed<Option>(
  () => options.find((option) => option.value === modelValue) as Option,
);

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
.select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.trigger {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-small);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.trigger:hover {
  background: var(--color-bg-secondary);
}

.trigger.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.trigger-icon {
  width: 20px;
  height: 20px;
}

.label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pane {
  display: flex;
  position: absolute;
  z-index: 2;
  gap: var(--spacing-small);
  flex-direction: column;
  max-height: 60vh;
  margin-top: var(--spacing-small);
  padding: 2px;
  overflow-y: auto;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

div[data-state='open'] .pane {
  animation: fade-in 0.25s ease-out;
}

div[data-state='closed'] .pane {
  animation: fade-out 0.25s ease-in;
}

.item {
  padding: 6px 16px;
  border-radius: var(--border-radius-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.item[data-highlighted] {
  outline: none;
  background: var(--color-bg-secondary);
}
</style>
