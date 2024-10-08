<template>
  <div class="wrapper">
    <div class="filter">
      <EthInput
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
        @click="() => emit('select', method)"
      >
        {{ method.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch } from 'vue';

import EthInput from '@/components/__common/EthInput.vue';
import useMethods from '@/composables/useMethods';
import { Method } from '@/utils/methods';

const { selected } = defineProps<{
  selected: Method;
}>();

const emit = defineEmits<{
  select: [value: Method];
}>();

const { cmd_slash } = useMagicKeys();
const { methods } = useMethods();

const inputEl = useTemplateRef<InstanceType<typeof EthInput>>('inputEl');

const methodQuery = ref('');

const availableMethods = computed(() =>
  methods.value.filter((method) =>
    method.id.toLowerCase().includes(methodQuery.value.toLowerCase()),
  ),
);

const isInputActive = computed(() => inputEl.value?.isActive);

watch(cmd_slash, (pressed) => {
  if (pressed) {
    inputEl.value?.focus();
  }
});

function handleUp(): void {
  const methodIndex = availableMethods.value.findIndex(
    (method) => method.id === selected.id,
  );
  const newMethodIndex = Math.max(methodIndex - 1, 0);
  emit('select', availableMethods.value[newMethodIndex]);
}

function handleDown(): void {
  const methodIndex = availableMethods.value.findIndex(
    (method) => method.id === selected.id,
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

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-normal);
  overflow-y: auto;
}

.filter {
  display: none;
}

@media (width >= 768px) {
  .filter {
    display: flex;
    position: relative;
    align-items: center;
  }
}

.filter-input {
  width: 100%;
}

.filter-tip {
  position: absolute;
  right: 4px;
  padding: 2px;
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  font-family: 'Helvetica Neue', sans-serif;
  font-size: var(--font-size-small);
}

.list {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

@media (width >= 768px) {
  .list {
    gap: var(--spacing-tiny);
    overflow: auto;
  }
}

.item {
  padding: 4px 8px;
  overflow-x: hidden;
  border-radius: var(--border-radius-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-big);
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (width >= 768px) {
  .item {
    overflow-x: initial;
    font-size: var(--font-size-normal);
  }
}

.item:hover {
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.item.selected {
  background: var(--color-accent-tertiary);
}
</style>
