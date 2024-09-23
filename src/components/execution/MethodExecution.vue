<template>
  <div class="targets">
    <EthRadio
      :model-value="targetLanguage"
      :options="targetLanguages"
      label="Language"
      @update:model-value="handleTargetLanguageUpdate"
    />
    <EthRadio
      v-if="targetLibraries.length > 1"
      :model-value="targetLibrary"
      :options="targetLibraries"
      label="Library"
      @update:model-value="handleTargetLibraryUpdate"
    />
  </div>
  <div class="request">
    <EthLabel value="Request" />
    <div class="request-view">
      <CodeView
        :value="request"
        compact
      />
      <button
        class="execute-button"
        :disabled="!isValid || isLoading"
        @click="execute"
      >
        Execute
      </button>
    </div>
  </div>
  <div class="response">
    <EthLabel value="Response" />
    <CodeView
      :value="response"
      :is-loading
      :is-error
    />
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import CodeView from '@/components/__common/CodeView.vue';
import EthLabel from '@/components/__common/EthLabel.vue';
import EthRadio, { Option } from '@/components/__common/EthRadio.vue';
import useChain from '@/composables/useChain';
import useTarget from '@/composables/useTarget';
import { Method, Param, getArrayParamItem } from '@/utils/methods';
import {
  Language as TargetLanguage,
  Library as TargetLibrary,
  LANGUAGE_JSON,
  LANGUAGE_JAVASCRIPT,
  LANGUAGE_PYTHON,
  LIBRARY_VANILLA,
  LIBRARY_ETHERS,
  LIBRARY_VIEM,
  LIBRARY_FETCH,
  LIBRARY_AXIOS,
  LIBRARY_WEB3_PY,
  LIBRARY_REQUESTS,
  getRequest,
} from '@/utils/targets';
import { validateParams } from '@/utils/validation';

interface Error {
  requestBody: string;
  requestMethod: string;
  url: string;
  code: number;
  message: string;
  details: string;
  version: string;
}

const isShown = defineModel<boolean>('isShown');

const isError = defineModel<boolean>('isError');

const { inputs, method } = defineProps<{
  inputs: unknown[];
  method: Method;
}>();

const { cmd_enter } = useMagicKeys();
const { client } = useChain();
const { target } = useTarget();

const targetLanguage = computed<TargetLanguage>(() => target.value.language);
const targetLanguages: Option[] = [
  {
    label: 'JSON',
    value: LANGUAGE_JSON,
  },
  {
    label: 'Javascript',
    value: LANGUAGE_JAVASCRIPT,
  },
  {
    label: 'Python',
    value: LANGUAGE_PYTHON,
  },
];

function handleTargetLanguageUpdate(language: string): void {
  const targetLanguage = language as TargetLanguage;
  const library = getTargetLibraryOptions(targetLanguage)[0]
    .value as TargetLibrary;
  target.value = {
    language: targetLanguage,
    library,
  };
}

const targetLibrary = computed<TargetLibrary>(() => target.value.library);
const targetLibraries = computed<Option[]>(() =>
  getTargetLibraryOptions(targetLanguage.value),
);

function getTargetLibraryOptions(language: TargetLanguage): Option[] {
  switch (language) {
    case LANGUAGE_JSON:
      return [{ label: 'Vanilla', value: LIBRARY_VANILLA }];
    case LANGUAGE_JAVASCRIPT:
      return [
        { label: 'ethers', value: LIBRARY_ETHERS },
        { label: 'viem', value: LIBRARY_VIEM },
        { label: 'Fetch', value: LIBRARY_FETCH },
        { label: 'Axios', value: LIBRARY_AXIOS },
      ];
    case LANGUAGE_PYTHON:
      return [
        { label: 'Web3.py', value: LIBRARY_WEB3_PY },
        { label: 'Requests', value: LIBRARY_REQUESTS },
      ];
    default:
      return [{ label: 'Vanilla', value: LIBRARY_VANILLA }];
  }
}

function handleTargetLibraryUpdate(library: string): void {
  target.value = {
    language: target.value.language,
    library: library as TargetLibrary,
  };
}

const isLoading = ref(false);

const isValid = computed(() => {
  const isParamValid = validateParams(method.params, inputs);
  return isParamValid.every((isValid) => isValid);
});

const formattedInputs = computed(() => {
  const convertedInputs = inputs.map((input, index) =>
    formatInput(method.params[index], input),
  );
  return method?.formatter
    ? method?.formatter(convertedInputs)
    : convertedInputs;
});

function formatInput(param: Param, input: unknown): unknown {
  if (param.type === 'array') {
    const itemInputs = input as unknown[];
    return itemInputs.map((itemInput, index) => {
      const itemParam = getArrayParamItem(param, index);
      return formatInput(itemParam, itemInput);
    });
  }
  if (param.type === 'object') {
    return Object.fromEntries(
      Object.entries(param.items).map(([key, value]) => [
        key,
        formatInput(value, (input as Record<string, unknown>)[key]),
      ]),
    );
  }
  if (input === '') {
    return null;
  }
  if (
    param.type === 'int' ||
    (param.type === 'block' && !isNaN(parseInt(input as string)))
  ) {
    // Convert to hex
    return `0x${new Number(parseInt(input as string)).toString(16)}`;
  }
  return input;
}

const request = computed(() =>
  getRequest(
    targetLanguage.value,
    targetLibrary.value,
    method.id,
    formattedInputs.value,
  ),
);

async function execute(): Promise<void> {
  isError.value = false;
  isLoading.value = true;
  try {
    result.value = await client.value.request({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      method: method.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      params: formattedInputs.value,
    });
  } catch (e) {
    const error = e as Error;
    // Prettify
    result.value = JSON.stringify(
      {
        code: error.code,
        details: error.details,
        message: error.message,
      },
      null,
      4,
    );
    isError.value = true;
  }
  isShown.value = true;
  isLoading.value = false;
}

watch(cmd_enter, (pressed) => {
  if (pressed && isValid.value) {
    execute();
  }
});

const result = ref('');
const response = computed(() => {
  return isLoading.value || !isShown.value
    ? ''
    : isError.value
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
.targets {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.request,
.response {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.request-view {
  position: relative;
}

.execute-button {
  position: absolute;
  right: 8px;
  bottom: 8px;
  margin: 0;
  padding: 10px 20px;
  transition: all 0.25s ease-in-out;
  border: none;
  border-radius: var(--border-radius-big);
  background: var(--color-accent-primary);
  box-shadow: var(--shadow-medium);
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
}

.execute-button:hover {
  background: var(--color-accent-secondary);
}

.execute-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
