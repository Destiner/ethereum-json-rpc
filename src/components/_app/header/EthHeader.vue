<template>
  <header>
    <div class="side">
      <BrandLogo class="icon" />
      <div class="label">Ethereum JSON-RPC</div>
      <div class="pages">
        <RouterLink
          class="page"
          :to="{ name: 'reference' }"
        >
          Reference
        </RouterLink>
        <RouterLink
          class="page"
          :to="{ name: 'providers' }"
        >
          Providers
        </RouterLink>
      </div>
    </div>
    <div class="side">
      <ProviderSelector />
      <LinkGithub class="icon-github" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import BrandLogo from './BrandLogo.vue';
import LinkGithub from './LinkGithub.vue';
import ProviderSelector from './ProviderSelector.vue';
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 12px;
  border-bottom: 1px solid var(--color-border-primary);
}

@media (min-width: 768px) {
  header {
    padding: 0 24px;
  }
}

.side {
  display: flex;
  gap: var(--spacing-big);
  align-items: center;
}

.icon {
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 50%;
  background: white;
}

.label {
  display: none;
  font-weight: bold;
}

.pages {
  display: flex;
  gap: var(--spacing-big);
}

.page {
  padding-bottom: 2px;
  color: inherit;
  font-size: var(--font-size-normal);
  text-decoration: inherit;
}

.page.router-link-active {
  border-bottom: 1px solid var(--color-text-secondary);
}

@media (min-width: 768px) {
  .label {
    display: initial;
  }
}

.icon-github {
  width: 24px;
  height: 24px;
}
</style>
