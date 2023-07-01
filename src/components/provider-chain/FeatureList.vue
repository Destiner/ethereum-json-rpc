<template>
  <div class="wrapper">
    <h2>Features</h2>
    <div class="list">
      <div
        v-for="featureType in supportedFeatureTypes"
        :key="featureType"
        class="item"
      >
        <IconSuccess
          class="icon"
          :class="{
            dimmed: getFeatureSupportType(features, featureType) === 'partial',
          }"
        />
        <div>
          {{ formatProviderFeature(featureType) }}
          <span
            v-if="getFeatureSupportType(features, featureType) === 'partial'"
            class="label-partial"
          >
            partial
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
import { Feature, Features, getFeatureSupportType } from '@/utils/providers';

const props = defineProps<{
  features: Features;
}>();

const featureTypes = computed(() => Object.keys(props.features) as Feature[]);
const supportedFeatureTypes = computed(() =>
  featureTypes.value.filter(
    (feature) => getFeatureSupportType(props.features, feature) !== 'none',
  ),
);
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

.label-partial {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}
</style>
