<template>
  <div class="header">
    <h1 class="title">{{ method.name }}</h1>
    <div class="meta">
      <div class="type">{{ method.type }}</div>
      <div class="id">{{ method.id }}</div>
    </div>
  </div>
  <div class="description">
    {{ method.description }}
  </div>
  <BannerCustomMethod
    v-if="method.type !== 'reading' && method.type !== 'writing'"
    :type="method.type"
  />
  <MethodForm
    v-if="hasParams"
    :inputs
    :params="method.params"
    @update:inputs="handleUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BannerCustomMethod from '@/components/execution/BannerCustomMethod.vue';
import { Method } from '@/utils/methods';

import MethodForm from './MethodForm.vue';

const inputs = defineModel<unknown[]>('inputs', {
  required: true,
});

const { method } = defineProps<{
  method: Method;
}>();

const hasParams = computed(() => method.params.length > 0);

function handleUpdate(value: unknown[]): void {
  inputs.value = value;
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
  letter-spacing: -0.5px;
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
