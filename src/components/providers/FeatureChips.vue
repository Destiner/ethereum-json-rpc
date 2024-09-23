<template>
  <div class="list">
    <div
      v-for="feature in FEATURES"
      :key="feature"
      class="item"
      :class="{ active: modelValue.includes(feature) }"
      @click="() => handleItemClick(feature)"
    >
      {{ formatProviderFeature(feature) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatProviderFeature } from '@/utils/formatters';
import { FEATURES, Feature } from '@/utils/providers';

const modelValue = defineModel<Feature[]>('modelValue', {
  required: true,
});

function handleItemClick(feature: Feature): void {
  const selectedValues = modelValue.value;
  if (selectedValues.includes(feature)) {
    modelValue.value = selectedValues.filter((item) => item !== feature);
    return;
  }
  modelValue.value = [...selectedValues, feature];
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-normal);
}

.item {
  display: flex;
  gap: var(--spacing-small);
  padding: 6px 10px;
  transition: all 0.25s ease-in-out;
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.item.active {
  border-color: var(--color-border-secondary);
  background: var(--color-bg-tertiary);
}

.item:hover {
  border-color: var(--color-accent-primary);
}
</style>
