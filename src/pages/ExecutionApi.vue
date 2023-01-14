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
        :method="selectedMethod"
        :inputs="inputs"
        :is-param-valid="isParamValid"
        @update-input="handleInputUpdate"
      />
    </article>
    <div class="execution">
      <MethodExecution
        v-model:is-error="isError"
        v-model:is-shown="isShown"
        :is-param-valid="isParamValid"
        :inputs="inputs"
        :method="selectedMethod"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import MethodEditor from '@/components/execution/MethodEditor.vue';
import MethodExecution from '@/components/execution/MethodExecution.vue';
import MethodList from '@/components/execution/MethodList.vue';
import { Method, LIST as METHOD_LIST } from '@/utils/methods';
import validate from '@/utils/validation';

onMounted(() => {
  resetParamInputs();
});

function handleMethodSelect(method: Method): void {
  selectedMethod.value = method;
  isShown.value = false;
  isError.value = false;
  resetParamInputs();
}

const selectedMethod = ref<Method>(METHOD_LIST[0]);

const inputs = ref<unknown[]>([]);

function handleInputUpdate(index: number, value: unknown): void {
  inputs.value[index] = value;
}

const isParamValid = computed(() =>
  validate(selectedMethod.value, inputs.value),
);

function resetParamInputs(): void {
  const newInputs = [];
  for (const param of selectedMethod.value.params) {
    const input = param.isRequired
      ? param.default
      : param.type === 'boolean'
      ? false
      : '';
    newInputs.push(input);
  }
  inputs.value = newInputs;
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
