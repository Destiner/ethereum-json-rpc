<template>
  <label :for="target">
    {{ value }}
    <span
      v-if="required"
      class="required"
    >
      *
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  required?: boolean;
  target?: string;
}>();
</script>

<style scoped>
label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  text-transform: uppercase;
}

.required {
  color: var(--color-error);
}
</style>
