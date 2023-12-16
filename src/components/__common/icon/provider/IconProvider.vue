<template>
  <div>
    <IconAlchemy v-if="provider === ALCHEMY" />
    <IconAnkr v-if="provider === ANKR" />
    <IconBlast v-if="provider === BLAST" />
    <IconCloudflare v-if="provider === CLOUDFLARE" />
    <IconInfura v-if="provider === INFURA" />
    <IconLlama v-if="provider === LLAMA" />
    <IconPokt v-if="provider === POKT" />
    <IconQuicknode v-if="provider === QUICKNODE" />
    <IconBlockpi v-if="provider === BLOCKPI" />
  </div>
</template>
<script setup lang="ts">
import {
  ALCHEMY,
  ANKR,
  BLAST,
  CLOUDFLARE,
  INFURA,
  LLAMA,
  POKT,
  QUICKNODE,
  BLOCKPI,
  Provider,
} from '@/utils/providers';
import IconAlchemy from './Alchemy.vue';
import IconAnkr from './Ankr.vue';
import IconBlast from './Blast.vue';
import IconCloudflare from './Cloudflare.vue';
import IconInfura from './Infura.vue';
import IconLlama from './Llama.vue';
import IconPokt from './Pokt.vue';
import IconQuicknode from './Quicknode.vue';
import IconBlockpi from './Blockpi.vue';
defineProps<{
  provider: Provider;
}>();
</script>