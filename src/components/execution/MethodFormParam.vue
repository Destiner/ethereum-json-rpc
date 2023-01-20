<template>
  <div
    class="param"
    :class="{ compound: param.type === 'array' || param.type === 'object' }"
  >
    <div class="meta">
      <div class="meta-section">
        <div class="name">{{ param.name }}</div>
        <div class="type">{{ param.type }}</div>
        <div
          v-if="isParamRequired(param)"
          class="required"
        >
          *
        </div>
      </div>
      <div class="meta-section">
        <div class="description">
          {{ param.description }}
        </div>
      </div>
    </div>
    <div v-if="param.type === 'array'">
      <MethodFormParam
        v-for="(item, index) in param.items"
        :key="index"
        :param="item"
        :input="(input as unknown[])[index]"
        @update:input="(value) => handleArrayUpdate(index, value)"
      />
    </div>
    <div v-else-if="param.type === 'object'">
      <MethodFormParam
        v-for="(item, key) in param.items"
        :key="key"
        :param="item"
        :input="(input as Record<string, unknown>)[key]"
        @update:input="(value) => handleObjectUpdate(key, value)"
      />
    </div>
    <div v-else-if="param.type === 'boolean'">
      <EthToggle
        :model-value="input as boolean"
        @update:model-value="handleUpdate"
      />
    </div>
    <div v-else>
      <EthInput
        :model-value="input as string"
        class="value"
        :has-error="!validateParam(param, input)"
        type="text"
        @update:model-value="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EthInput from '@/components/__common/EthInput.vue';
import EthToggle from '@/components/__common/EthToggle.vue';
import { Param } from '@/utils/methods';
import { validateParam } from '@/utils/validation';

const props = defineProps<{
  param: Param;
  input: unknown;
}>();

const emit = defineEmits<{
  (e: 'update:input', value: unknown): void;
}>();

function isParamRequired(param: Param): boolean {
  if (param.type === 'array') {
    return false;
  }
  if (param.type === 'object') {
    return false;
  }
  return param.isRequired;
}

function handleUpdate(input: unknown): void {
  emit('update:input', input);
}

function handleArrayUpdate(index: number, value: unknown): void {
  const newInput = [...(props.input as unknown[])];
  newInput[index] = value;
  emit('update:input', newInput);
}

function handleObjectUpdate(key: string, value: unknown): void {
  const newInput = { ...(props.input as Record<string, unknown>) };
  newInput[key] = value;
  emit('update:input', newInput);
}
</script>

<style scoped>
.param {
  display: flex;
  padding: 10px;
}

.param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.param.compound {
  flex-direction: column;
  padding-right: 0;
  padding-bottom: 0;
}

.meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-normal);
}

.meta-section {
  display: flex;
  gap: var(--spacing-small);
  align-items: baseline;
}

.name {
  font-size: var(--font-size-normal);
  font-weight: bold;
}

.type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.required {
  color: var(--color-error);
}

.description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.value {
  width: 140px;
  text-align: right;
}
</style>
