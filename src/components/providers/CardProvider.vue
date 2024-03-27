<template>
  <RouterLink
    :to="{
      name: 'provider-chain',
      params: {
        provider: provider,
        chain: chain,
      },
    }"
  >
    <div class="card">
      <div class="header">
        <IconProvider
          class="icon"
          :provider="provider"
        />
        <div class="name">{{ getProviderName(provider) }}</div>
      </div>
      <div class="data">
        <div class="features">
          <div
            v-for="feature in supportedFeatures"
            :key="feature"
            class="feature"
          >
            {{ formatProviderFeature(feature) }}
          </div>
        </div>
        <div class="methods">
          <div
            v-for="methodGroup in supportedMethodGroups"
            :key="methodGroup"
            class="method"
          >
            {{ formatMethodGroup(methodGroup) }}
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import IconProvider from '@/components/__common/icon/provider/IconProvider.vue';
import { Chain } from '@/utils/chains';
import { formatProviderFeature, formatMethodGroup } from '@/utils/formatters';
import { MethodId, getSupportedMethodGroups } from '@/utils/methods';
import {
  Feature,
  Provider,
  ProviderChainData,
  getProviderName,
} from '@/utils/providers';

const props = defineProps<{
  provider: Provider;
  providerData: ProviderChainData | null;
  chain: Chain;
}>();

const supportedFeatures = computed(() => {
  const providerData = props.providerData;
  if (!providerData) {
    return [];
  }
  const providerFeatures = providerData.features;
  if (!providerFeatures) {
    return [];
  }
  const features = Object.keys(providerFeatures) as Feature[];
  const supportedFeatures = features.filter(
    (feature) => providerFeatures[feature] === 'supported',
  );
  return supportedFeatures;
});

const supportedMethodGroups = computed(() => {
  const providerData = props.providerData;
  if (!providerData) {
    return [];
  }
  const providerMethods = providerData.methods;
  if (!providerMethods) {
    return [];
  }
  const allMethodIds = Object.keys(providerMethods) as MethodId[];
  const supportedMethodIds = allMethodIds.filter(
    (methodId) => providerMethods[methodId] === 'supported',
  );
  return getSupportedMethodGroups(supportedMethodIds);
});
</script>

<style scoped>
a {
  display: flex;
  color: inherit;
  text-decoration: inherit;
}

.card {
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 100%;
  padding: 20px 24px;
  transition: all 200ms ease-in-out;
  border: 1px solid var(--color-border-secondary);
  border-radius: 12px;
  cursor: pointer;
}

@media (width >= 768px) {
  .card {
    width: 300px;
  }
}

.card:hover {
  border-color: var(--color-accent-primary);
}

.header {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

.icon {
  width: 48px;
  height: 48px;
}

.name {
  font-size: 16px;
  font-weight: bold;
}

.data {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

.features,
.methods {
  --item-gap: 4px;

  display: flex;
  gap: var(--item-gap);
  flex-wrap: wrap;
}

.feature,
.method {
  font-size: 12px;
}

.features .feature:not(:last-child)::after,
.methods .method:not(:last-child)::after {
  content: '·';
  margin-left: var(--item-gap);
}
</style>
