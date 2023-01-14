<template>
  <label :for="target">{{ value }}</label>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  target?: string;
}>();
</script>

<style scoped>
label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  text-transform: uppercase;
}
</style>
