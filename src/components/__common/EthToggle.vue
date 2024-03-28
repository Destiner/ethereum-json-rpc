<template>
  <div class="switch">
    <Switch.Root
      :model-value="modelValue"
      as="template"
      @update:model-value="handleUpdate"
    >
      <button class="root">
        <Switch.Thumb class="thumb" />
      </button>
    </Switch.Root>
  </div>
</template>

<script setup lang="ts">
import { Switch } from 'radix-vue/namespaced';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function handleUpdate(value: boolean): void {
  emit('update:modelValue', value);
}
</script>

<style scoped>
.switch {
  --border-width: 2px;
  --trigger-size: 20px;
  --travel-length: 20px;
}

.root {
  display: inline-flex;
  position: relative;
  width: calc(
    var(--trigger-size) + var(--travel-length) + 2 * var(--border-width)
  );
  height: calc(var(--trigger-size) + 2 * var(--border-width));
  padding: 0;
  transition: color 0.2s;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  border-width: var(--border-width);
  border-radius: calc((var(--trigger-size) + 2 * var(--border-width)) / 2);
  border-color: transparent;
  outline: none;
  outline-color: #ffffffbf;
  outline-width: var(--border-width);
  background: var(--color-bg-tertiary);
  cursor: pointer;
}

.root[data-state='checked'] {
  background: var(--color-accent-secondary);
}

.thumb {
  display: inline-block;
  width: var(--trigger-size);
  height: var(--trigger-size);
  transform: translateX(0);
  transition: all 0.2s ease-in-out;
  border-radius: 100%;
  outline: 0;
  background-color: white;
  box-shadow:
    0 4px 6px #0000001a,
    0 2px 4px #0000000f;
  pointer-events: none;
}

.thumb[data-state='checked'] {
  transform: translateX(var(--travel-length));
}

/* 
button {
  display: inline-flex;
  position: relative;
  width: calc(
    var(--trigger-size) + var(--travel-length) + 2 * var(--border-width)
  );
  height: calc(var(--trigger-size) + 2 * var(--border-width));
  padding: 0;
  transition: color 0.2s;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  border-width: var(--border-width);
  border-radius: calc((var(--trigger-size) + 2 * var(--border-width)) / 2);
  border-color: transparent;
  outline: none;
  outline-color: #ffffffbf;
  outline-width: var(--border-width);
  background: var(--color-bg-tertiary);
  cursor: pointer;
}

button.active {
  background: var(--color-accent-secondary);
}

.trigger {
  display: inline-block;
  width: var(--trigger-size);
  height: var(--trigger-size);
  transform: translateX(0);
  transition: all 0.2s ease-in-out;
  border-radius: 100%;
  outline: 0;
  background-color: white;
  box-shadow:
    0 4px 6px #0000001a,
    0 2px 4px #0000000f;
  pointer-events: none;
}

.trigger.active {
  transform: translateX(var(--travel-length));
} */
</style>
