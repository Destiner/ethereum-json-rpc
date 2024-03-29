<template>
  <div class="wrapper">
    <h2>Features</h2>
    <div class="list">
      <div
        v-for="(_, feature) in supportedFeatures"
        :key="feature"
        class="item"
      >
        <IconSuccess
          class="icon"
          :class="{
            dimmed: isSupportUnknown(feature),
          }"
        />
        <div>
          {{ formatProviderFeature(feature) }}
          <span
            v-if="isSupportUnknown(feature)"
            class="label-unknown"
          >
            unknown
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import IconSuccess from '@/components/__common/icon/Success.vue';
import { formatProviderFeature } from '@/utils/formatters';
import { Feature, Features } from '@/utils/providers';

const props = defineProps<{
  features: Features;
}>();

const supportedFeatures = computed<Partial<Features>>(() => {
  // Filter out non-supported features and sort by support type
  const supportedFeatures: Partial<Features> = {};
  for (const featureKey in props.features) {
    const feature = featureKey as Feature;
    if (props.features[feature] === 'supported') {
      supportedFeatures[feature] = 'supported';
    }
  }
  for (const featureKey in props.features) {
    const feature = featureKey as Feature;
    if (props.features[feature] === 'unknown') {
      supportedFeatures[feature] = 'unknown';
    }
  }
  return supportedFeatures;
});

function isSupportUnknown(feature: Feature): boolean {
  return supportedFeatures.value[feature] === 'unknown';
}
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
  gap: var(--spacing-normal);
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid var(--color-accent-primary);
  border-radius: 50%;
  color: var(--color-accent-primary);
}

.icon.dimmed {
  opacity: 0.4;
}

.label-unknown {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}
</style>
