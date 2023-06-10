<template>
  <div class="wrapper">
    <h2>Features</h2>
    <div class="list">
      <div
        v-for="feature in features"
        :key="feature"
        class="item"
      >
        <IconSuccess class="icon" />
        {{ formatProviderFeature(feature) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSuccess from '@/components/__common/icon/Success.vue';
import { formatProviderFeature } from '@/utils/formatters';
import { Feature } from '@/utils/providers';

defineProps<{
  features: Feature[];
}>();
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
}

h2 {
  margin: 0;
  font-size: 20px;
  line-height: 1;
}

.list {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.item {
  display: flex;
  gap: var(--spacing-small);
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid var(--color-success);
  border-radius: 50%;
  color: var(--color-success);
}
</style>
