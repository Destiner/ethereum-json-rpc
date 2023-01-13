<template>
  <div class="filter">
    <input
      ref="inputEl"
      v-model="methodQuery"
      class="filter-input"
      placeholder="Filter"
      @keydown.up.prevent="handleUp"
      @keydown.down.prevent="handleDown"
    />
    <span class="filter-tip">{{ inputTipLabel }}</span>
  </div>
  <div class="list">
    <div
      v-for="method in availableMethods"
      :key="method.id"
      class="item"
      :class="{ selected: method.id === selected.id }"
      @click="emit('select', method)"
    >
      {{ method.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveElement, useMagicKeys } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import { Method, LIST as METHOD_LIST } from '@/utils/methods';

const props = defineProps<{
  selected: Method;
}>();

const emit = defineEmits<{
  (e: 'select', value: Method): void;
}>();

const activeElement = useActiveElement();
const { cmd_slash } = useMagicKeys();

const inputEl = ref<HTMLInputElement | null>(null);

const methodQuery = ref('');

const availableMethods = computed(() =>
  METHOD_LIST.filter((method) =>
    method.id.toLowerCase().includes(methodQuery.value.toLowerCase()),
  ),
);

const isInputActive = computed(() => activeElement.value === inputEl.value);

watch(cmd_slash, (pressed) => {
  if (pressed) {
    inputEl.value?.focus();
  }
});

function handleUp(): void {
  const methodIndex = availableMethods.value.findIndex(
    (method) => method.id === props.selected.id,
  );
  const newMethodIndex = Math.max(methodIndex - 1, 0);
  emit('select', availableMethods.value[newMethodIndex]);
}

function handleDown(): void {
  const methodIndex = availableMethods.value.findIndex(
    (method) => method.id === props.selected.id,
  );
  const newMethodIndex = Math.min(
    methodIndex + 1,
    availableMethods.value.length - 1,
  );
  emit('select', availableMethods.value[newMethodIndex]);
}

const inputTipLabel = computed(() => {
  const metaKey = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
    ? '⌘'
    : 'Ctrl+';
  return isInputActive.value ? '↑↓' : `${metaKey}/`;
});
</script>

<style>
.filter {
  display: flex;
  position: relative;
  align-items: center;
}

.filter-input {
  width: 100%;
  margin: 0;
  padding: 2px 4px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 14px;
}

.filter-input:focus {
  border: 1px solid var(--color-border-secondary);
}

.filter-tip {
  position: absolute;
  right: 4px;
  padding: 2px;
  border-radius: 4px;
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 12px;
}

.list {
  display: flex;
  gap: 2px;
  flex-direction: column;
}

@media (min-width: 768px) {
  .list {
    overflow-x: auto;
  }
}

.item {
  padding: 4px 8px;
  overflow: hidden;
  border-radius: 4px;
  color: var(--color-text-primary);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.item:hover {
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.item.selected {
  background: var(--color-accent-tertiary);
}
</style>
