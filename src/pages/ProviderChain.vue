<template>
  <div class="page">
    <div class="content">
      <div class="header">
        <IconProvider
          class="icon"
          :provider="provider"
        />
        <h1>{{ data.name }}</h1>
      </div>
      <div
        v-if="chain"
        class="chain"
      >
        <EthSelect
          :model-value="chain"
          class="select"
          :options="chainOptions"
          :label="'Chain'"
          @update:model-value="handleChainUpdate"
        />
        <EndpointUrl
          v-if="endpoint"
          :endpoint="endpoint"
        />
        <NodeMetadata
          v-if="data.node"
          :metadata="data.node"
        />
      </div>
      <BannerLimitedSupport />
      <Features :features="data.features" />
      <ChartStats :stats="data.stats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import EthSelect from '@/components/__common/EthSelect.vue';
import IconProvider from '@/components/__common/icon/provider/IconProvider.vue';
import BannerLimitedSupport from '@/components/provider-chain/BannerLimitedSupport.vue';
import ChartStats from '@/components/provider-chain/ChartStats.vue';
import EndpointUrl from '@/components/provider-chain/EndpointUrl.vue';
import Features from '@/components/provider-chain/Features.vue';
import NodeMetadata from '@/components/provider-chain/NodeMetadata.vue';
import { CHAINS, Chain, getChainName } from '@/utils/chains';
import { Provider, getProviderData } from '@/utils/providers';

const route = useRoute();
const router = useRouter();

const provider = computed(() => route.params.provider as Provider);
const chainName = computed(() => route.params.chain as string);

const chain = ref<Chain | null>(null);
const chainOptions = computed(() => {
  const { endpoints } = getProviderData(provider.value);
  return Object.entries(endpoints)
    .filter(([, value]) => !!value)
    .map(([chain]) => ({
      value: chain,
      label: getChainName(chain as Chain),
    }));
});

watch(
  () => chainName.value,
  (value) => {
    chain.value = CHAINS.find((chain) => chain === value) || null;
  },
  {
    immediate: true,
  },
);

const data = computed(() => getProviderData(provider.value));
const endpoint = computed(() => data.value.endpoints[chain.value as Chain]);

function handleChainUpdate(value: string): void {
  router.push({
    name: 'provider-chain',
    params: {
      provider: provider.value,
      chain: value,
    },
  });
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 16px;
}

@media (min-width: 768px) {
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

@media (min-width: 768px) {
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
  flex-wrap: wrap;
  gap: var(--spacing-big);
}

.select {
  width: 140px;
}
</style>
