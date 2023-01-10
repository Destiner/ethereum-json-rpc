<template>
  <header>
    <div>Ethereum JSON RPC</div>
  </header>
  <main>
    <nav class="methods">
      <input
        v-model="methodQuery"
        class="methods-filter"
        placeholder="Filter"
      />
      <div class="method-list">
        <div
          v-for="method in availableMethods"
          :key="method.id"
          class="method-item"
          :class="{ selected: method.id === selectedMethod.id }"
          @click="selectMethod(method)"
        >
          {{ method.id }}
        </div>
      </div>
    </nav>
    <article class="method">
      <div class="method-header">
        <h1 class="method-title">{{ selectedMethod.name }}</h1>
        <div class="method-meta">
          <div class="method-type">Standard</div>
          <div class="method-id">{{ selectedMethod.id }}</div>
        </div>
      </div>
      <div class="method-description">
        {{ selectedMethod.description }}
      </div>
      <div
        v-if="hasParams"
        class="method-params"
      >
        <div class="method-param-header">Params</div>
        <div class="method-param-list">
          <div
            v-for="(param, index) in selectedMethod.params"
            :key="index"
            class="method-param"
          >
            <div class="method-param-meta">
              <div class="method-param-name">{{ param.name }}</div>
              <div class="method-param-type">{{ param.type }}</div>
              <div
                v-if="param.isRequired"
                class="method-param-required"
              >
                *
              </div>
            </div>
            <div v-if="param.type === 'boolean'">
              <BaseToggle
                :model-value="inputs[index] as boolean"
                @update:model-value="(val) => handleInputUpdate(val, index)"
              />
            </div>
            <div v-else>
              <input
                v-model="inputs[index]"
                class="method-param-value"
                :class="{ invalid: !isParamValid[index] }"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
    <div class="execution">
      <div class="execution-request">
        <div class="execution-request-label">Request</div>
        <CodeView
          :value="request"
          :is-loading="false"
        />
        <div>
          <button
            class="execution-request-body"
            :disabled="!isValid"
            @click="execute"
          >
            Execute
          </button>
        </div>
      </div>
      <div class="execution-response">
        <div class="execution-response-label">Response</div>
        <CodeView
          :value="response"
          :is-loading="isLoading"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { providers } from 'ethers';
import { computed, onMounted, ref } from 'vue';

import BaseToggle from '@/components/BaseToggle.vue';
import CodeView from '@/components/CodeView.vue';
import { Method, LIST as METHOD_LIST } from '@/utils/methods';
import validate from '@/utils/validation';

onMounted(() => {
  resetParamInputs();
});

const methodQuery = ref('');

const availableMethods = computed(() =>
  METHOD_LIST.filter((method) =>
    method.id.toLowerCase().includes(methodQuery.value.toLowerCase()),
  ),
);

const selectedMethod = ref<Method>(METHOD_LIST[0]);

function selectMethod(method: Method): void {
  selectedMethod.value = method;
  isShown.value = false;
  resetParamInputs();
}

const inputs = ref<unknown[]>([]);
const formattedInputs = computed(() => {
  const convertedInputs = inputs.value.map((input, index) => {
    if (input === '') {
      return null;
    }
    const param = selectedMethod.value.params[index];
    if (
      param.type === 'int' ||
      (param.type === 'block' && !isNaN(parseInt(input as string)))
    ) {
      // Convert to hex
      return `0x${new Number(parseInt(input as string)).toString(16)}`;
    }
    return input;
  });
  return selectedMethod.value?.formatter
    ? selectedMethod.value?.formatter(convertedInputs)
    : convertedInputs;
});

function handleInputUpdate(param: unknown, index: number): void {
  inputs.value[index] = param;
}

const isParamValid = computed(() =>
  validate(selectedMethod.value, inputs.value),
);
const isValid = computed(() => isParamValid.value.every((isValid) => isValid));

const request = computed(() => {
  const request = {
    jsonrpc: '2.0',
    method: selectedMethod.value.id,
    params: formattedInputs.value,
  };
  return JSON.stringify(request, null, 4);
});

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

const hasParams = computed(() => selectedMethod.value.params.length > 0);

async function execute(): Promise<void> {
  isLoading.value = true;
  const provider = new providers.InfuraProvider();
  result.value = await (provider as providers.JsonRpcProvider).send(
    selectedMethod.value.id,
    formattedInputs.value,
  );
  isShown.value = true;
  isLoading.value = false;
}

const isShown = ref(false);
const isLoading = ref(false);
const result = ref('');
const response = computed(() => {
  return isLoading.value || !isShown.value
    ? ''
    : JSON.stringify(
        {
          jsonrpc: '2.0',
          result: result.value,
        },
        null,
        4,
      );
});
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid var(--color-border-primary);
  font-weight: bold;
}

main {
  --section-padding: 8px 12px;

  display: flex;
  gap: 24px;
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
  gap: 8px;
  flex: 1;
  flex-direction: column;
  max-height: 220px;
  padding: var(--section-padding);
  overflow-x: auto;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .methods {
    max-height: initial;
    padding: 15px 20px 10px;
  }
}

.methods-filter {
  margin: 0;
  padding: 2px 4px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 14px;
}

.methods-filter:focus {
  border: 1px solid var(--color-border-secondary);
}

.method-list {
  display: flex;
  gap: 2px;
  flex-direction: column;
}

@media (min-width: 768px) {
  .method-list {
    overflow-x: auto;
  }
}

.method-item {
  padding: 4px 8px;
  overflow: hidden;
  border-radius: 4px;
  color: var(--color-text-primary);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.method-item:hover {
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.method-item.selected {
  background: var(--color-accent-secondary);
}

.method {
  display: flex;
  gap: 32px;
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

.method-header {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.method-title {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
}

.method-meta {
  display: flex;
  gap: 4px;
  align-items: center;
}

.method-type {
  padding: 2px 4px;
  border-radius: 2px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-size: 11px;
  text-transform: uppercase;
}

.method-id {
  color: var(--color-text-secondary);
}

.method-description {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.method-params {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.method-param-header {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-transform: uppercase;
}

.method-param-list {
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  background: var(--color-bg-secondary);
}

.method-param {
  display: flex;
  padding: 10px;
}

.method-param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.method-param-meta {
  display: flex;
  gap: 4px;
  flex: 1;
  align-items: baseline;
}

.method-param-name {
  font-size: 14px;
  font-weight: bold;
}

.method-param-type {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.method-param-required {
  color: var(--color-error);
}

.method-param-value {
  width: 140px;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 14px;
  text-align: right;
}

.method-param-value:focus {
  border: 1px solid var(--color-border-secondary);
}

.method-param-value.invalid {
  border: 1px solid var(--color-error);
}

.execution {
  display: flex;
  gap: 16px;
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

.execution-request,
.execution-response {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.execution-request-label,
.execution-response-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-transform: uppercase;
}

.execution-request-body {
  padding: 10px 20px;
  transition: all 0.25s ease-in-out;
  border: none;
  border-radius: 10px;
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
  font-weight: bold;
  cursor: pointer;
}

.execution-request-body:hover {
  background: var(--color-accent-tertiary);
}

.execution-request-body:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
