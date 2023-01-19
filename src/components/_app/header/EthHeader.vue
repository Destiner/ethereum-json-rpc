<template>
  <header>
    <div class="branding">
      <BrandLogo class="icon" />
      <div class="label">Ethereum JSON-RPC</div>
    </div>
    <ProviderSelector />
  </header>
</template>

<script setup lang="ts">
import BrandLogo from './BrandLogo.vue';
import ProviderSelector from './ProviderSelector.vue';
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 12px;
  border-bottom: 1px solid var(--color-border-primary);
}

@media (min-width: 768px) {
  header {
    padding: 0 24px;
  }
}

.branding {
  display: flex;
  gap: var(--spacing-normal);
  align-items: center;
}

.icon {
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 50%;
  background: var(--color-text-primary);
}

.label {
  display: none;
  font-weight: bold;
}

@media (min-width: 768px) {
  .label {
    display: initial;
  }
}
</style>
