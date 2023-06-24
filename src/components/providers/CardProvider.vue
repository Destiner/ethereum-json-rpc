<template>
  <RouterLink
    :to="{
      name: 'provider-chain',
      params: {
        provider: provider.id,
        chain: chain,
      },
    }"
  >
    <div class="card">
      <div class="header">
        <IconProvider
          class="icon"
          :provider="provider.id"
        />
        <div class="name">{{ provider.name }}</div>
      </div>
      <div class="data">
        <div class="tiers">
          <div
            v-for="tier in provider.tiers"
            :key="tier"
            class="tier"
          >
            {{ formatProviderTier(tier) }}
          </div>
        </div>
        <div class="features">
          <div
            v-for="feature in supportedFeatureTypes"
            :key="feature"
            class="feature"
          >
            {{ formatProviderFeature(feature) }}
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
import { formatProviderFeature, formatProviderTier } from '@/utils/formatters';
import {
  Feature,
  ProviderData,
  getFeatureSupportType,
} from '@/utils/providers';

const props = defineProps<{
  provider: ProviderData;
  chain: Chain;
}>();

const featureTypes = computed(
  () => Object.keys(props.provider.features) as Feature[],
);
const supportedFeatureTypes = computed(() =>
  featureTypes.value.filter(
    (feature) =>
      getFeatureSupportType(props.provider.features, feature) !== 'none',
  ),
);
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

@media (min-width: 768px) {
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

.data {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

.name {
  font-size: 16px;
  font-weight: bold;
}

.tiers,
.features {
  --item-gap: 4px;

  display: flex;
  gap: var(--item-gap);
  flex-wrap: wrap;
}

.tier,
.feature {
  font-size: 12px;
}

.tiers .tier:not(:last-child)::after,
.features .feature:not(:last-child)::after {
  content: '·';
  margin-left: var(--item-gap);
}
</style>
