<template>
  <main>
    <nav class="methods">
      <MethodList
        :selected="selectedMethod"
        @select="handleMethodSelect"
      />
    </nav>
    <article class="method">
      <MethodEditor
        v-model:inputs="inputs"
        :method="selectedMethod"
      />
    </article>
    <div class="execution">
      <MethodExecution
        v-model:is-error="isError"
        v-model:is-shown="isShown"
        :inputs="inputs"
        :method="selectedMethod"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import MethodEditor from '@/components/execution/MethodEditor.vue';
import MethodExecution from '@/components/execution/MethodExecution.vue';
import MethodList from '@/components/execution/MethodList.vue';
import useMethods from '@/composables/useMethods';
import { Method, Param, getArrayParamItem } from '@/utils/methods';

const { methods } = useMethods();

onMounted(() => {
  resetParamInputs();
});

function handleMethodSelect(method: Method): void {
  selectedMethod.value = method;
  isShown.value = false;
  isError.value = false;
  resetParamInputs();
}

const selectedMethod = ref<Method>(methods.value[0]);

const inputs = ref<unknown[]>([]);

function resetParamInputs(): void {
  const newInputs = [];
  for (const param of selectedMethod.value.params) {
    const input = getDefaultParamValue(param);
    newInputs.push(input);
  }
  inputs.value = newInputs;
}

function getDefaultParamValue(param: Param): unknown {
  if (param.type === 'array') {
    const length = param.count ? param.count : 1;
    return Array.from({ length }, (_, i) =>
      getDefaultParamValue(getArrayParamItem(param, i)),
    );
  }
  if (param.type === 'object') {
    return Object.fromEntries(
      Object.entries(param.items).map(([key, value]) => [
        key,
        getDefaultParamValue(value),
      ]),
    );
  }
  if (param.isRequired) {
    return param.default;
  }
  if (param.type === 'boolean') {
    return false;
  }
  return '';
}

const isShown = ref(false);
const isError = ref(false);
</script>

<style scoped>
main {
  --section-padding: 8px 12px;

  display: flex;
  gap: var(--spacing-large);
  flex-direction: column;
  min-height: calc(100vh - 64px);
}

@media (min-width: 768px) {
  main {
    flex-direction: row;
    gap: 0;
  }
}

.methods {
  display: flex;
  gap: var(--spacing-normal);
  flex: 1;
  flex-direction: column;
  max-height: 220px;
  padding: var(--section-padding);
  overflow-x: auto;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .methods {
    min-width: 350px;
    max-height: initial;
    padding: 15px 20px 10px;
  }
}

.method {
  display: flex;
  gap: var(--spacing-large);
  flex: 3;
  flex-direction: column;
  padding: var(--section-padding);
  border-top: 1px solid var(--color-border-primary);
}

@media (min-width: 768px) {
  .method {
    padding: 30px;
    border-top: none;
    border-right: 1px solid var(--color-border-primary);
    border-left: 1px solid var(--color-border-primary);
  }
}

.execution {
  display: flex;
  gap: var(--spacing-big);
  flex: 2;
  flex-direction: column;
  padding: var(--section-padding);
  border-top: 1px solid var(--color-border-primary);
}

@media (min-width: 768px) {
  .execution {
    padding: 15px 20px 10px;
    border-top: none;
  }
}
</style>
