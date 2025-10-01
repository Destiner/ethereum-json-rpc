<template>
  <div>
    <IconAlchemy v-if="provider === ALCHEMY" />
    <IconAnkr v-if="provider === ANKR" />
    <IconBlast v-if="provider === BLAST_API" />
    <IconChainstack v-if="provider === CHAINSTACK" />
    <IconCloudflare v-if="provider === CLOUDFLARE" />
    <IconDrpc v-if="provider === DRPC" />
    <IconInfura v-if="provider === INFURA" />
    <IconLlamaNodes v-if="provider === LLAMA_NODES" />
    <IconOneRpc v-if="provider === ONE_RPC" />
    <IconPublicNode v-if="provider === PUBLIC_NODE" />
    <IconTenderly v-if="provider === TENDERLY" />
    <IconQuicknode v-if="provider === QUICK_NODE" />
  </div>
</template>

<script setup lang="ts">
import {
  ALCHEMY,
  ANKR,
  BLAST_API,
  CHAINSTACK,
  CLOUDFLARE,
  DRPC,
  INFURA,
  LLAMA_NODES,
  ONE_RPC,
  PUBLIC_NODE,
  TENDERLY,
  QUICK_NODE,
  Provider,
} from '@/utils/providers';

import IconAlchemy from './Alchemy.vue';
import IconAnkr from './Ankr.vue';
import IconBlast from './Blast.vue';
import IconChainstack from './Chainstack.vue';
import IconCloudflare from './Cloudflare.vue';
import IconDrpc from './Drpc.vue';
import IconInfura from './Infura.vue';
import IconLlamaNodes from './LlamaNodes.vue';
import IconOneRpc from './OneRpc.vue';
import IconPublicNode from './PublicNode.vue';
import IconQuicknode from './Quicknode.vue';
import IconTenderly from './Tenderly.vue';

defineProps<{
  provider: Provider;
}>();
</script>
