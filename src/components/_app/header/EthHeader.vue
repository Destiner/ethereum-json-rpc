<template>
  <header>
    <div class="side left">
      <div class="brand">
        <BrandLogo class="icon" />
        <div class="label">Ethereum JSON-RPC</div>
      </div>
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
        <RouterLink
          class="page"
          :to="{ name: 'errors' }"
        >
          Errors
        </RouterLink>
      </div>
    </div>
    <div class="side right">
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

@media (width >= 768px) {
  header {
    padding: 0 24px;
  }
}

.side {
  display: flex;
  align-items: center;
  height: calc(100% + 1px);
}

.left {
  gap: var(--spacing-large);
}

.right {
  gap: var(--spacing-big);
}

.brand {
  display: none;
  gap: var(--spacing-normal);
  align-items: center;
}

.icon {
  width: 28px;
  height: 28px;
  padding: 4px;
  border-radius: 50%;
  background: white;
}

.label {
  font-weight: bold;
}

@media (width >= 768px) {
  .brand {
    display: flex;
  }
}

.pages {
  display: flex;
  gap: var(--spacing-big);
  align-items: center;
  height: 100%;
}

.page {
  height: 100%;
  padding-bottom: 2px;
  opacity: 0.6;
  color: inherit;
  font-size: var(--font-size-normal);
  line-height: calc(var(--header-height) - 1px);
  text-decoration: inherit;
}

.page:hover {
  opacity: 1;
}

.page.router-link-active {
  border-bottom: 1px solid var(--color-accent-primary);
  opacity: 1;
}

.icon-github {
  width: 24px;
  height: 24px;
}
</style>
