<template>
  <header>
    <div class="label">Ethereum JSON-RPC</div>
    <ProviderSelector />
  </header>
</template>

<script setup lang="ts">
import ProviderSelector from './ProviderSelector.vue';
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid var(--color-border-primary);
}

.label {
  font-weight: bold;
}
</style>
