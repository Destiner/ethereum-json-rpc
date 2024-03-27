<template>
  <div class="banner">{{ text }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { MethodType } from '@/utils/methods';

const props = defineProps<{
  type: MethodType;
}>();

const text = computed(() => {
  switch (props.type) {
    case 'standard':
      return '';
    case 'debug':
      return 'This method is not a part of the API specification and may be unavailable on some nodes. It was originally implemented in Geth only, but since then was adopted by other clients. Additionally, many hosted node providers will require a paid plan for access.';
    case 'trace':
      return 'This method is not a part of the API specification and may be unavailable on some nodes. It was originally implemented in Parity only, but since then was adopted by other clients. Additionally, many hosted node providers will require a paid plan for access.';
    case 'erigon':
      return 'This method is not a part of the API specification and may be unavailable on some nodes. It was implemented in Erigon, which was adopted by some providers. Additionally, many hosted node providers will require a paid plan for access.';
    default:
      return '';
  }
});
</script>

<style scoped>
.banner {
  padding: 8px;
  border: 1px solid var(--color-border-info);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-info);
  color: var(--color-text-info);
  font-size: var(--font-size-normal);
}
</style>
