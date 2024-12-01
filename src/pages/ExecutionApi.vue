<template>
  <Head>
    <title>Execution API Reference | Ethereum JSON-RPC API</title>
    <meta
      name="description"
      content="Technical reference for execution API methods in the Ethereum JSON-RPC API spec."
    />
    <meta
      property="og:image"
      content="https://ethereum-json-rpc.com/reference.png"
    />
    <meta
      property="twitter:image"
      content="https://ethereum-json-rpc.com/reference.png"
    />
  </Head>
  <main>
    <nav class="methods">
      <EthModal
        v-if="isPhone"
        :open="isModalOpen"
        @close="handleModalClose"
      >
        <MethodList
          :selected="selectedMethod"
          @select="handleMethodSelect"
        />
      </EthModal>
      <MethodList
        v-else
        :selected="selectedMethod"
        @select="handleMethodSelect"
      />
      <div
        v-if="isPhone"
        class="method-button"
        @click="openModal"
      >
        {{ selectedMethod.id }}
        <IconChevronDown class="dropdown-icon" />
      </div>
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
import { Head } from '@unhead/vue/components';
import { useBreakpoints, useUrlSearchParams } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

import EthModal from '@/components/__common/EthModal.vue';
import IconChevronDown from '@/components/__common/icon/ChevronDown.vue';
import MethodEditor from '@/components/execution/MethodEditor.vue';
import MethodExecution from '@/components/execution/MethodExecution.vue';
import MethodList from '@/components/execution/MethodList.vue';
import useMethods from '@/composables/useMethods';
import { Method, Param, getArrayParamItem } from '@/utils/methods';

const breakpoints = useBreakpoints({
  tablet: 640,
});
const isPhone = breakpoints.smaller('tablet');
const params = useUrlSearchParams('history');
const { methods } = useMethods();

onMounted(() => {
  const method = methods.value.find((method) => method.id === params.method);
  if (method) {
    selectedMethod.value = method;
  }
  resetParamInputs();
});

const isModalOpen = ref(false);
function openModal(): void {
  isModalOpen.value = true;
}
function handleModalClose(): void {
  isModalOpen.value = false;
}

function handleMethodSelect(method: Method): void {
  selectedMethod.value = method;
  isShown.value = false;
  isError.value = false;
  isModalOpen.value = false;
  resetParamInputs();
}

const selectedMethod = ref<Method>(methods.value[0]);
watch(selectedMethod, () => {
  params.method = selectedMethod.value.id;
});

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
  gap: var(--spacing-normal);
  flex-direction: column;
  min-height: calc(100vh - 64px);
}

@media (width >= 768px) {
  main {
    flex-direction: row;
    gap: 0;
  }
}

.methods {
  display: flex;
  position: sticky;
  top: 0;
  gap: var(--spacing-normal);
  flex: 1;
  flex-direction: column;
  max-height: 220px;
  padding: 8px;
  overflow: auto;
}

@media (width >= 768px) {
  .methods {
    min-width: 350px;
    max-height: calc(100vh - var(--header-height));
    padding: 15px 20px 10px;
  }
}

.method-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-medium);
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
}

.method {
  display: flex;
  gap: var(--spacing-large);
  flex: 3;
  flex-direction: column;
  padding: var(--section-padding);
  border-top: 1px solid var(--color-border-primary);
}

@media (width >= 768px) {
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

@media (width >= 768px) {
  .execution {
    padding: 15px 20px 10px;
    border-top: none;
  }
}
</style>
