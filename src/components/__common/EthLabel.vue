<template>
  <label
    :for="target"
    :class="{ disabled }"
  >
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
  disabled?: boolean;
  target?: string;
}>();
</script>

<style scoped>
label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

label.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.required {
  color: var(--color-error);
}
</style>
