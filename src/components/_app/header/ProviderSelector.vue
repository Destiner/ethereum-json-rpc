<template>
  <div class="selector">
    <Popover.Root>
      <Popover.Trigger
        as="template"
        class="trigger"
      >
        <span>{{ label }}</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end">
          <div class="panel">
            <div
              ref="el"
              class="provider"
            >
              <EthSelect
                v-model="providerType"
                :options="providerOptions"
                :label="'Provider'"
              />
            </div>
            <div
              v-if="providerType === 'custom'"
              class="url"
            >
              <EthInput
                v-model="url"
                :label="'URL'"
                required
                :has-error="hasError(isUrlValid, isUrlDirty)"
                @input="handleUrlInput"
              />
            </div>
            <div
              v-if="providerType !== 'automatic' && providerType !== 'custom'"
              class="key"
            >
              <EthInput
                v-model="key"
                :label="'Key'"
                required
                :has-error="hasError(isKeyValid, isKeyDirty)"
                @input="handleKeyInput"
              />
            </div>
            <div class="chain">
              <EthSelect
                v-if="providerType !== 'custom'"
                :model-value="getChainTagById(chain)"
                :options="chainOptions"
                :label="'Chain'"
                @update:model-value="handleChainUpdate"
              />
              <EthSelect
                v-else
                :model-value="
                  getChainTagById(
                    providerChain || (UNKNOWN_CHAIN as ChainOrUnknown),
                  )
                "
                :options="readableChainOptions"
                :label="'Chain'"
                disabled
              />
            </div>
            <div
              v-if="providerType !== 'automatic' && providerType !== 'custom'"
              class="url"
            >
              <EthInput
                :model-value="providerUrl"
                :label="'URL'"
                disabled
                class="input"
              />
            </div>
            <div
              v-if="latestBlock >= 0"
              class="status"
              :class="{ loading: isLoading }"
            >
              <div
                class="status-indicator"
                :class="{ success: !isError, error: isError }"
              />
              <div
                class="status-label"
                :class="{ success: !isError, error: isError }"
              >
                {{ isError ? 'Unavailable' : latestBlock }}
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  </div>
</template>

<script setup lang="ts">
import { useElementVisibility, useIntervalFn } from '@vueuse/core';
import { Popover } from 'radix-vue/namespaced';
import { computed, onMounted, ref, watch } from 'vue';

import EthInput from '@/components/__common/EthInput.vue';
import EthSelect, { Option } from '@/components/__common/EthSelect.vue';
import useChain, {
  ALCHEMY,
  ANKR,
  REFERENCE_CHAINS,
  INFURA,
  Preset as PresetType,
  ReferenceChain,
} from '@/composables/useChain';
import {
  ETHEREUM,
  OPTIMISM,
  BASE,
  POLYGON,
  ARBITRUM,
  UNKNOWN_CHAIN,
  getChainName,
} from '@/utils/chains';
import { isValidUrl } from '@/utils/validation';

type ChainTag = 'ethereum' | 'optimism' | 'base' | 'polygon' | 'arbitrum';
type ChainOrUnknown = ReferenceChain | typeof UNKNOWN_CHAIN;

const PING_INTERVAL = 10000;

const label = computed(() =>
  getChainName(providerChain.value || UNKNOWN_CHAIN),
);

const el = ref<HTMLElement | null>(null);
const isVisible = useElementVisibility(el);

const { options, client, chain: providerChain, url: providerUrl } = useChain();

function getChainTagById(id: ChainOrUnknown): ChainTag | 'unknown' {
  switch (id) {
    case ETHEREUM:
      return 'ethereum';
    case OPTIMISM:
      return 'optimism';
    case BASE:
      return 'base';
    case POLYGON:
      return 'polygon';
    case ARBITRUM:
      return 'arbitrum';
    case UNKNOWN_CHAIN:
      return 'unknown';
  }
}

function getChainIdByTag(tag: ChainTag): ReferenceChain {
  switch (tag) {
    case 'ethereum':
      return ETHEREUM;
    case 'optimism':
      return OPTIMISM;
    case 'base':
      return BASE;
    case 'polygon':
      return POLYGON;
    case 'arbitrum':
      return ARBITRUM;
  }
}

const AUTOMATIC_PROVIDER = 'automatic';
const CUSTOM_PROVIDER = 'custom';
type ProviderType =
  | typeof AUTOMATIC_PROVIDER
  | typeof CUSTOM_PROVIDER
  | PresetType;

const providerOptions: {
  value: ProviderType;
  label: string;
}[] = [
  {
    value: 'automatic',
    label: 'Automatic',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
  {
    value: ALCHEMY,
    label: 'Alchemy',
  },
  {
    value: INFURA,
    label: 'Infura',
  },
  {
    value: ANKR,
    label: 'Ankr',
  },
];

const providerType = ref<ProviderType>(AUTOMATIC_PROVIDER);

watch(providerType, (_newType, oldType) => {
  if (oldType === 'custom') {
    isUrlDirty.value = false;
    url.value = '';
  }
  if (oldType !== 'automatic' && oldType !== 'custom') {
    isKeyDirty.value = false;
    key.value = '';
  }
  updateOptions();
});

function updateOptions(): void {
  if (!isValid.value) {
    return;
  }
  switch (providerType.value) {
    case AUTOMATIC_PROVIDER: {
      options.value = {
        type: AUTOMATIC_PROVIDER,
        chain: chain.value,
      };
      break;
    }
    case CUSTOM_PROVIDER: {
      options.value = {
        type: CUSTOM_PROVIDER,
        url: url.value,
      };
      break;
    }
    case ALCHEMY:
    case INFURA:
    case ANKR: {
      options.value = {
        type: 'preset',
        preset: providerType.value,
        key: key.value,
        chain: chain.value,
      };
    }
  }
}

const chain = ref<ReferenceChain>(ETHEREUM);

const chainOptions = getChainOptions(REFERENCE_CHAINS);
const readableChainOptions = getChainOptions([
  ...REFERENCE_CHAINS,
  UNKNOWN_CHAIN,
]);

function handleChainUpdate(chainName: string): void {
  chain.value = getChainIdByTag(chainName as ChainTag);
  updateOptions();
}

function getChainOptions(
  chains: (ReferenceChain | typeof UNKNOWN_CHAIN)[],
): Option[] {
  return chains.map((chain) => {
    return {
      label: getChainName(chain),
      value: getChainTagById(chain),
    };
  });
}

watch(chain, () => {
  updateOptions();
});

const url = ref('');
const isUrlDirty = ref(false);
const isUrlValid = computed(() => !!url.value && isValidUrl(url.value));
function handleUrlInput(): void {
  isUrlDirty.value = true;
  updateOptions();
}

const key = ref('');
const isKeyDirty = ref(false);
const isKeyValid = computed(() => !!key.value);
function handleKeyInput(): void {
  isKeyDirty.value = true;
  updateOptions();
}

const isValid = computed(() => {
  switch (providerType.value) {
    case AUTOMATIC_PROVIDER: {
      return true;
    }
    case CUSTOM_PROVIDER: {
      return isUrlValid.value;
    }
    default: {
      return isKeyValid.value;
    }
  }
});

function hasError(isValid: boolean, isDirty: boolean): boolean {
  return !isValid && isDirty;
}

function fill(): void {
  switch (options.value.type) {
    case AUTOMATIC_PROVIDER: {
      providerType.value = AUTOMATIC_PROVIDER;
      chain.value = options.value.chain;
      break;
    }
    case CUSTOM_PROVIDER: {
      providerType.value = CUSTOM_PROVIDER;
      url.value = options.value.url;
      break;
    }
    case 'preset': {
      providerType.value = options.value.preset;
      key.value = options.value.key;
      chain.value = options.value.chain;
    }
  }
}

watch(client, () => {
  ping();
});

const pingInterval = useIntervalFn(
  () => {
    ping();
  },
  PING_INTERVAL,
  {
    immediate: false,
    immediateCallback: true,
  },
);

onMounted(() => {
  ping();
});

watch(isVisible, (value) => {
  if (value) {
    fill();
    pingInterval.resume();
  } else {
    pingInterval.pause();
  }
});

async function ping(): Promise<void> {
  isLoading.value = true;
  try {
    latestBlock.value = await client.value.getBlockNumber();
    isError.value = false;
  } catch {
    isError.value = true;
  }
  isLoading.value = false;
}

const isError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const latestBlock = ref<bigint>(-1n);
</script>

<style scoped>
.selector {
  position: relative;
}

.trigger {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: transparent;
  box-shadow: var(--shadow-medium);
  font-size: var(--font-size-big);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.trigger:hover {
  border-color: var(--color-border-secondary);
}

.panel {
  display: flex;
  position: absolute;
  z-index: 1;
  right: 0;
  gap: var(--spacing-big);
  flex-direction: column;
  width: 240px;
  margin-top: var(--spacing-small);
  padding: 16px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
  font-size: var(--font-size-normal);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

div[data-state='open'] .panel {
  animation: fade-in 0.25s ease-out;
}

div[data-state='closed'] .panel {
  animation: fade-out 0.25s ease-in;
}

.input.error {
  border-color: var(--color-error);
}

.status {
  display: flex;
  gap: var(--spacing-normal);
  align-items: center;
  padding-left: 2px;
  transition: opacity 0.2s ease-in-out;
}

.status.loading {
  opacity: 0.6;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.status-indicator.success {
  background: var(--color-success);
  box-shadow: 0 0 8px 2px var(--color-success);
}

.status-indicator.error {
  background: var(--color-error);
  box-shadow: 0 0 8px 2px var(--color-error);
}

.status-label.success {
  color: var(--color-success);
}

.status-label.error {
  color: var(--color-error);
}
</style>
