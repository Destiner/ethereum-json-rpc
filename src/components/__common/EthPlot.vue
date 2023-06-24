<template>
  <div
    ref="el"
    class="wrapper"
  />
</template>

<script setup lang="ts">
import * as Plot from '@observablehq/plot';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  options: Plot.PlotOptions;
}>();

const el = ref<HTMLElement | null>(null);

onMounted(() => {
  if (el.value) {
    el.value.append(Plot.plot(props.options));
  }
});

watch(
  () => props.options,
  () => {
    if (el.value) {
      el.value.innerHTML = '';
      el.value.append(Plot.plot(props.options));
    }
  },
);
</script>

<style scoped>
.wrapper :deep(svg) {
  width: 100%;
  background: var(--color-bg-primary);
}
</style>
