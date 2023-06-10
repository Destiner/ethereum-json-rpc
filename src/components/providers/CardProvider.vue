<template>
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
          v-for="feature in provider.features"
          :key="feature"
          class="feature"
        >
          {{ formatProviderFeature(feature) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconProvider from '@/components/__common/icon/provider/IconProvider.vue';
import { formatProviderFeature, formatProviderTier } from '@/utils/formatters';
import { ProviderData } from '@/utils/providers';

defineProps<{
  provider: ProviderData;
}>();
</script>

<style scoped>
.card {
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 300px;
  padding: 20px 24px;
  transition: all 200ms ease-in-out;
  border: 1px solid var(--color-border-secondary);
  border-radius: 12px;
  cursor: pointer;
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
