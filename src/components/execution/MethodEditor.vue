<template>
  <div class="header">
    <h1 class="title">{{ method.name }}</h1>
    <div class="meta">
      <div class="type">Standard</div>
      <div class="id">{{ method.id }}</div>
    </div>
  </div>
  <div class="description">
    {{ method.description }}
  </div>
  <div
    v-if="hasParams"
    class="params"
  >
    <div class="param-header">Params</div>
    <div class="param-list">
      <div
        v-for="(param, index) in method.params"
        :key="index"
        class="param"
      >
        <div class="param-meta">
          <div class="param-meta-section">
            <div class="param-name">{{ param.name }}</div>
            <div class="param-type">{{ param.type }}</div>
            <div
              v-if="param.isRequired"
              class="param-required"
            >
              *
            </div>
          </div>
          <div class="param-meta-section">
            <div class="param-description">
              {{ param.description }}
            </div>
          </div>
        </div>
        <div v-if="param.type === 'boolean'">
          <BaseToggle
            :model-value="inputs[index] as boolean"
            @update:model-value="(val) => emit('update-input', index, val)"
          />
        </div>
        <div v-else>
          <input
            :value="inputs[index]"
            class="param-value"
            :class="{ invalid: !isParamValid[index] }"
            type="text"
            @input="(e) => handleInputUpdate(e, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseToggle from '@/components/BaseToggle.vue';
import { Method } from '@/utils/methods';

const props = defineProps<{
  method: Method;
  inputs: unknown[];
  isParamValid: boolean[];
}>();

const emit = defineEmits<{
  (e: 'update-input', index: number, value: unknown): void;
}>();

const hasParams = computed(() => props.method.params.length > 0);

function handleInputUpdate(event: Event, index: number): void {
  emit('update-input', index, (event.target as HTMLInputElement).value);
}
</script>

<style scoped>
.header {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.title {
  margin: 0;
  font-size: var(--font-size-extra-large);
  font-weight: bold;
}

.meta {
  display: flex;
  gap: var(--spacing-small);
  align-items: center;
}

.type {
  padding: 2px 4px;
  border-radius: var(--border-radius-small);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-size: var(--font-size-tiny);
  text-transform: uppercase;
}

.id {
  color: var(--color-text-secondary);
}

.description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
}

.params {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.param-header {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  text-transform: uppercase;
}

.param-list {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
}

.param {
  display: flex;
  padding: 10px;
}

.param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.param-meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.param-meta-section {
  display: flex;
  gap: var(--spacing-small);
  align-items: baseline;
}

.param-name {
  font-size: var(--font-size-normal);
  font-weight: bold;
}

.param-type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.param-required {
  color: var(--color-error);
}

.param-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.param-value {
  width: 140px;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  text-align: right;
}

.param-value:focus {
  border: 1px solid var(--color-border-secondary);
}

.param-value.invalid {
  border: 1px solid var(--color-error);
}
</style>
