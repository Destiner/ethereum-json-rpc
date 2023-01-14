<template>
  <div class="request">
    <div class="request-label">Request</div>
    <CodeView
      :value="request"
      :is-loading="false"
    />
    <div>
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
    <div class="response-label">Response</div>
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

import CodeView from '@/components/CodeView.vue';
import { Method } from '@/utils/methods';

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
  const provider = new providers.InfuraProvider();
  try {
    result.value = await (provider as providers.JsonRpcProvider).send(
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

.request-label,
.response-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  text-transform: uppercase;
}

.request-body {
  padding: 10px 20px;
  transition: all 0.25s ease-in-out;
  border: none;
  border-radius: var(--border-radius-big);
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
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
