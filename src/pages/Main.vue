<template>
  <div>
    <h1>Main page</h1>
    <Banner />
    <div>Latest block on Ethereum: {{ block }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Banner from '@/components/BannerBase.vue';

const block = ref('0');

async function getLatestBlock(): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const url = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=YourApiKeyToken`;
  const data = await fetch(url);
  const json = await data.json();
  const block = json.result;
  return block;
}

onMounted(async () => {
  block.value = await getLatestBlock();
});
</script>
