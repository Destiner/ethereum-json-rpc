<template>
  <div class="page">
    <div class="content">
      <h1>Providers</h1>
      <div class="providers">
        <ChipsChain v-model="chain" />
        <div class="cards">
          <CardProvider
            v-for="provider in availableProviders"
            :key="provider"
            :provider="getProviderData(provider)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import CardProvider from '@/components/providers/CardProvider.vue';
import ChipsChain from '@/components/providers/ChipsChain.vue';
import { Chain } from '@/utils/chains';
import { PROVIDERS, Provider, getProviderData } from '@/utils/providers';

const chain = ref<Chain>('ethereum');

const availableProviders = computed<Provider[]>(() =>
  PROVIDERS.filter((provider) => {
    const { endpoints } = getProviderData(provider);
    return endpoints[chain.value] !== null;
  }),
);
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  gap: 32px;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
}

@media (min-width: 768px) {
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
  gap: 16px;
}

.cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
