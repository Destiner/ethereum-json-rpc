<template>
  <div class="form">
    <MethodFormParam
      v-for="(param, index) in params"
      :key="index"
      :param
      :input="inputs[index]"
      @update:input="(value) => handleUpdate(index, value)"
    />
  </div>
</template>

<script setup lang="ts">
import { Param } from '@/utils/methods';

import MethodFormParam from './MethodFormParam.vue';

const props = defineProps<{
  params: Param[];
  inputs: unknown[];
}>();

const emit = defineEmits<{
  (e: 'update:inputs', value: unknown[]): void;
}>();

function handleUpdate(index: number, value: unknown): void {
  const newInputs = [...props.inputs];
  newInputs[index] = value;
  emit('update:inputs', newInputs);
}
</script>

<style scoped>
.form {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
}
</style>
