<template>
  <Head>
    <title>Provider Specification | Ethereum JSON-RPC API</title>
    <meta
      name="description"
      content="A list of supported features and methods for a JSON-RPC API provider."
    />
    <meta
      property="og:image"
      content="https://ethereum-json-rpc.com/providers.png"
    />
    <meta
      property="twitter:image"
      content="https://ethereum-json-rpc.com/providers.png"
    />
  </Head>
  <div class="page">
    <div class="content">
      <div class="header">
        <IconProvider
          class="icon"
          :provider
        />
        <h1>{{ getProviderName(provider) }}</h1>
      </div>
      <div
        v-if="chain"
        class="chain"
      >
        <div class="chain-block">
          <EthSelect
            :model-value="chain"
            class="select"
            :options="chainOptions"
            :label="'Chain'"
            @update:model-value="handleChainUpdate"
          />
          <EndpointUrl
            v-if="endpoint"
            :endpoint
          />
        </div>
        <div class="chain-block">
          <div class="last-update-label">
            Last update: {{ lastUpdateLabel }}
          </div>
        </div>
      </div>
      <BannerLimitedSupport v-if="provider !== QUICK_NODE" />
      <FeatureList
        v-if="features"
        :features
      />
      <MethodList
        v-if="methods"
        :methods
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head } from '@unhead/vue/components';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import EthSelect from '@/components/__common/EthSelect.vue';
import IconProvider from '@/components/__common/icon/provider/IconProvider.vue';
import BannerLimitedSupport from '@/components/provider-chain/BannerLimitedSupport.vue';
import EndpointUrl from '@/components/provider-chain/EndpointUrl.vue';
import FeatureList from '@/components/provider-chain/FeatureList.vue';
import MethodList from '@/components/provider-chain/MethodList.vue';
import {
  Chain,
  ChainId,
  getChainById,
  getChainId,
  getChainName,
} from '@/utils/chains';
import { formatRelativeTime } from '@/utils/formatters';
import {
  Features,
  Provider,
  Methods,
  QUICK_NODE,
  getProviderName,
  getProviderRegistry,
  getEndpoint,
} from '@/utils/providers';

const router = useRouter();
const route = useRoute();

const provider = computed(() => route.params.provider as Provider);
const chain = computed(() => route.params.chain as Chain);

const chainOptions = computed(() => {
  const registry = getProviderRegistry();
  const providerChainIds = Object.keys(registry[provider.value]).map(
    (key) => parseInt(key) as ChainId,
  );
  return providerChainIds.map((chainId) => {
    const chain = getChainById(chainId);
    return {
      value: chain,
      label: getChainName(chain),
    };
  });
});

const chainId = computed(() => getChainId(chain.value));
function handleChainUpdate(value: string): void {
  router.push({
    name: 'provider-chain',
    params: {
      provider: provider.value,
      chain: value,
    },
  });
}

const endpoint = computed(() => {
  return getEndpoint(provider.value, chainId.value);
});

const lastUpdateLabel = computed<string>(() => {
  const registry = getProviderRegistry();
  const providerChainData = registry[provider.value][chainId.value];
  if (!providerChainData) {
    return 'never';
  }
  const updateTimestamp = providerChainData.timestamp;
  return formatRelativeTime(new Date(updateTimestamp));
});

const features = computed<Features | null>(() => {
  const registry = getProviderRegistry();
  const providerChainData = registry[provider.value][chainId.value];
  if (!providerChainData) {
    return null;
  }
  return providerChainData.features;
});

const methods = computed<Methods | null>(() => {
  const registry = getProviderRegistry();
  const providerChainData = registry[provider.value][chainId.value];
  if (!providerChainData) {
    return null;
  }
  return providerChainData.methods;
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 16px;
}

@media (width >= 768px) {
  .page {
    padding: 32px 0;
  }
}

.content {
  display: flex;
  gap: var(--spacing-large);
  flex-direction: column;
  width: 100%;
}

@media (width >= 768px) {
  .content {
    width: 960px;
  }
}

.header {
  display: flex;
  align-items: end;
  gap: var(--spacing-big);
}

.icon {
  width: 32px;
  height: 32px;
}

h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1;
}

.chain {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column-reverse;
  align-items: start;
}

@media (width >= 768px) {
  .chain {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.chain-block {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-big);
}

.select {
  width: 240px;
}

.last-update-label {
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
