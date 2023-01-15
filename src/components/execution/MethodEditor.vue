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
    <EthLabel :value="'Params'" />
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
          <EthToggle
            :model-value="inputs[index] as boolean"
            @update:model-value="(val) => emit('update-input', index, val)"
          />
        </div>
        <div v-else>
          <EthInput
            :model-value="inputs[index] as string"
            class="param-value"
            :has-error="!isParamValid[index]"
            type="text"
            @update:model-value="(val) => emit('update-input', index, val)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EthInput from '@/components/__common/EthInput.vue';
import EthLabel from '@/components/__common/EthLabel.vue';
import EthToggle from '@/components/__common/EthToggle.vue';
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
  text-align: right;
}
</style>
