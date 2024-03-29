<template>
  <Head>
    <title>Providers | Ethereum JSON-RPC API</title>
    <meta
      name="description"
      content="A list of JSON-RPC API providers"
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
      <h1>Providers</h1>
      <div class="providers">
        <div class="filters">
          <EthSelect
            v-model="chainSelected"
            class="select"
            :options="chainOptions"
            label="Chain"
          />
          <EthSelect
            v-model="methodSelected"
            class="select"
            :options="methodOptions"
            label="Method Support"
          />
          <FeatureChips v-model="selectedFeatures" />
        </div>
        <div
          v-if="availableProviders.length > 0"
          class="cards"
        >
          <CardProvider
            v-for="provider in availableProviders"
            :key="provider"
            :provider
            :provider-data="getProviderData(provider)"
            :chain="getChainById(chainId)"
          />
        </div>
        <div
          v-else
          class="cards-empty"
        >
          No providers matching the selected criteria.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head } from '@unhead/vue/components';
import { computed, ref } from 'vue';

import EthSelect, { Option } from '@/components/__common/EthSelect.vue';
import CardProvider from '@/components/providers/CardProvider.vue';
import FeatureChips from '@/components/providers/FeatureChips.vue';
import {
  CHAINS,
  Chain,
  ETHEREUM,
  getChainById,
  getChainId,
  getChainName,
} from '@/utils/chains';
import { METHODS, MethodId } from '@/utils/methods';
import {
  Feature,
  Provider,
  ProviderChainData,
  getProviderRegistry,
} from '@/utils/providers';

const chainId = computed(() => getChainId(chainSelected.value));

const availableProviders = computed<Provider[]>(() => {
  const registry = getProviderRegistry();
  const providers = Object.keys(registry) as Provider[];
  return providers.filter((provider) => {
    const providerChain = registry[provider][chainId.value];
    if (!providerChain) {
      return false;
    }
    if (
      methodSelected.value !== METHOD_ANY &&
      providerChain.methods[methodSelected.value] !== 'supported'
    ) {
      return false;
    }
    const supportsAllSelectedFeatures = selectedFeatures.value.every(
      (feature) => {
        return providerChain.features[feature] === 'supported';
      },
    );
    return supportsAllSelectedFeatures;
  });
});

function getProviderData(provider: Provider): ProviderChainData | null {
  const registry = getProviderRegistry();
  return registry[provider][chainId.value] || null;
}

const chainSelected = ref<Chain>(ETHEREUM);
const chainOptions = computed(() => {
  return CHAINS.map((chain) => ({
    value: chain,
    label: getChainName(chain),
  }));
});

const METHOD_ANY = 'any';
const methodSelected = ref<MethodId | typeof METHOD_ANY>(METHOD_ANY);
const methodOptions = computed(() => {
  const options: Option[] = [
    {
      value: METHOD_ANY,
      label: 'Any',
    },
  ];
  const methodOptions = METHODS.map((method) => ({
    value: method,
    label: method,
  }));
  options.push(...methodOptions);
  return options;
});

const selectedFeatures = ref<Feature[]>([]);
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

h1 {
  margin: 0;
  font-size: 24px;
}

.providers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
}

.filters {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
}

.select {
  width: 100%;
  max-width: 220px;
}

.cards {
  display: flex;
  gap: var(--spacing-big);
  flex-wrap: wrap;
}

.cards-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
}
</style>
