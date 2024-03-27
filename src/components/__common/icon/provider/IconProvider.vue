<template>
  <div>
    <IconAlchemy v-if="provider === ALCHEMY" />
    <IconAnkr v-if="provider === ANKR" />
    <IconCloudflare v-if="provider === CLOUDFLARE" />
    <IconDrpc v-if="provider === DRPC" />
  </div>
</template>

<script setup lang="ts">
import {
  ALCHEMY,
  ANKR,
  CLOUDFLARE,
  DRPC,
  Provider,
} from '@/utils/providers';

import IconAlchemy from './Alchemy.vue';
import IconAnkr from './Ankr.vue';
import IconCloudflare from './Cloudflare.vue';
import IconDrpc from './Drpc.vue';

defineProps<{
  provider: Provider;
}>();
</script>
