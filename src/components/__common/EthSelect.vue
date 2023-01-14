<template>
  <div>
    <Listbox
      :model-value="selectedOption"
      @update:model-value="handleUpdate"
    >
      <ListboxButton class="trigger">
        <div>{{ selectedOption.label }}</div>
        <IconChevronDown class="trigger-icon" />
      </ListboxButton>

      <transition name="list">
        <ListboxOptions class="list">
          <ListboxOption
            v-for="option in options"
            v-slot="{ active, selected }"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              class="item"
              :class="{ active, selected }"
            >
              {{ option.label }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { computed } from 'vue';

import IconChevronDown from '@/components/__common/icon/ChevronDown.vue';

const props = defineProps<{
  value: string;
  options: Option[];
}>();

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

const selectedOption = computed<Option>(
  () => props.options.find((option) => option.value === props.value) as Option,
);

function handleUpdate(value: string): void {
  emit('select', value);
}
</script>

<script lang="ts">
interface Option {
  value: string;
  label: string;
}

// eslint-disable-next-line import/prefer-default-export
export { Option };
</script>

<style scoped>
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
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.trigger:hover {
  border-color: var(--color-border-secondary);
}

.trigger-icon {
  width: 20px;
  height: 20px;
}

.list-enter-active {
  transition: all 200ms ease-out;
}

.list-enter-from {
  opacity: 0;
}

.list-enter-to {
  opacity: 1;
}

.list-leave-active {
  transition: all 150ms ease-in;
}

.list-leave-form {
  opacity: 1;
}

.list-leave-to {
  opacity: 0;
}

.list {
  display: flex;
  position: absolute;
  z-index: 2;
  gap: var(--spacing-small);
  flex-direction: column;
  margin-top: var(--spacing-small);
  padding: 2px;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

.item {
  padding: 4px 16px;
  overflow: hidden;
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

.item.active {
  background: var(--color-bg-secondary);
}
</style>
