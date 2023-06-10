<template>
  <div>
    <ArbitrumIcon v-if="chain === ARBITRUM" />
    <EthereumIcon v-if="chain === ETHEREUM" />
    <OptimismIcon v-if="chain === OPTIMISM" />
    <PolygonIcon v-if="chain === POLYGON" />
  </div>
</template>

<script setup lang="ts">
import { ETHEREUM, ARBITRUM, OPTIMISM, POLYGON, Chain } from '@/utils/chains';

import ArbitrumIcon from './Arbitrum.vue';
import EthereumIcon from './Ethereum.vue';
import OptimismIcon from './Optimism.vue';
import PolygonIcon from './Polygon.vue';

defineProps<{
  chain: Chain;
}>();
</script>
