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

const inputs = defineModel<unknown[]>('inputs', {
  required: true,
});

defineProps<{
  params: Param[];
}>();

function handleUpdate(index: number, value: unknown): void {
  const newInputs = [...inputs.value];
  newInputs[index] = value;
  inputs.value = newInputs;
}
</script>

<style scoped>
.form {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-secondary);
}
</style>
