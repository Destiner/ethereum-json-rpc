<template>
  <div class="request">
    <EthLabel :value="'Request'" />
    <div class="request-wrapper">
      <CodeView
        :value="request"
        :is-loading="false"
      />
      <button
        class="request-body"
        :disabled="!isValid || isLoading"
        @click="execute"
      >
        Execute
      </button>
    </div>
  </div>
  <div class="response">
    <EthLabel :value="'Response'" />
    <CodeView
      :value="response"
      :is-loading="isLoading"
      :is-error="isError"
    />
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { providers } from 'ethers';
import { computed, ref, watch } from 'vue';

import CodeView from '@/components/__common/CodeView.vue';
import EthLabel from '@/components/__common/EthLabel.vue';
import { Method } from '@/composables/useMethods';
import useProvider from '@/composables/useProvider';

interface Error {
  body: string;
  error: {
    code: number;
  };
  requestBody: string;
  requestMethod: string;
  url: string;
  code: string;
  version: string;
}

const props = defineProps<{
  isParamValid: boolean[];
  inputs: unknown[];
  method: Method;
  isShown: boolean;
  isError: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:is-shown', value: boolean): void;
  (e: 'update:is-error', value: boolean): void;
}>();

const { cmd_enter } = useMagicKeys();
const { provider } = useProvider();

const isLoading = ref(false);

const isValid = computed(() => props.isParamValid.every((isValid) => isValid));

const formattedInputs = computed(() => {
  const convertedInputs = props.inputs.map((input, index) => {
    if (input === '') {
      return null;
    }
    const param = props.method.params[index];
    if (
      param.type === 'int' ||
      (param.type === 'block' && !isNaN(parseInt(input as string)))
    ) {
      // Convert to hex
      return `0x${new Number(parseInt(input as string)).toString(16)}`;
    }
    return input;
  });
  return props.method?.formatter
    ? props.method?.formatter(convertedInputs)
    : convertedInputs;
});

const request = computed(() => {
  const request = {
    jsonrpc: '2.0',
    method: props.method.id,
    params: formattedInputs.value,
  };
  return JSON.stringify(request, null, 4);
});

async function execute(): Promise<void> {
  emit('update:is-error', false);
  isLoading.value = true;
  try {
    result.value = await (provider.value as providers.JsonRpcProvider).send(
      props.method.id,
      formattedInputs.value,
    );
  } catch (e) {
    const error = e as Error;
    // Prettify
    result.value = JSON.stringify(JSON.parse(error.body), null, 4);
    emit('update:is-error', true);
  }
  emit('update:is-shown', true);
  isLoading.value = false;
}

watch(cmd_enter, (pressed) => {
  if (pressed && isValid.value) {
    execute();
  }
});

const result = ref('');
const response = computed(() => {
  return isLoading.value || !props.isShown
    ? ''
    : props.isError
    ? result.value
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
.request,
.response {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.request-wrapper {
  position: relative;
}

.request-body {
  position: absolute;
  right: 8px;
  bottom: 8px;
  margin: 0;
  padding: 10px 20px;
  transition: all 0.25s ease-in-out;
  border: none;
  border-radius: var(--border-radius-big);
  background: var(--color-accent-primary);
  color: var(--color-accent-tertiary);
  font-weight: bold;
  cursor: pointer;
}

.request-body:hover {
  background: var(--color-accent-secondary);
}

.request-body:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
