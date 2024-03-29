<template>
  <Dialog.Root
    :open
    @update:open="handleOpenUpdate"
  >
    <Dialog.Portal>
      <Dialog.Overlay class="overlay" />
      <div>
        <Dialog.Content>
          <Dialog.Title> {{ title }} </Dialog.Title>
          <Dialog.Description>
            {{ description }}
          </Dialog.Description>
          <div class="body">
            <IconCross
              class="button-close"
              @click="handleCrossClick"
            />
            <div
              as="div"
              class="panel"
            >
              <slot />
            </div>
          </div>
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  </Dialog.Root>
</template>

<script setup lang="ts">
import { Dialog } from 'radix-vue/namespaced';

import IconCross from './icon/Cross.vue';

defineProps<{
  open: boolean;
  title?: string;
  description?: string;
}>();

const emit = defineEmits<{ (e: 'close'): void }>();

function handleOpenUpdate(open: boolean): void {
  if (!open) {
    emit('close');
  }
}

function handleCrossClick(): void {
  emit('close');
}
</script>

<style scoped>
.dialog {
  position: relative;
  z-index: 1;
}

.overlay {
  position: fixed;
  inset: 0;
  background: #000000c0;
}

.body {
  display: flex;
  position: fixed;
  inset: 0;
  flex-direction: column;
  align-items: end;
  justify-content: center;
}

.button-close {
  width: 28px;
  height: 28px;
  margin: 16px;
  opacity: 0.8;
  cursor: pointer;
}

.button-close:hover {
  opacity: 1;
}

@media (width >= 768px) {
  .button-close {
    display: none;
  }
}

.panel {
  width: 100%;
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

@media (width >= 768px) {
  .panel {
    width: 450px;
    height: 60vh;
  }
}

@keyframes fade-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.95);
    opacity: 0;
  }
}

div[data-state='open'] .panel {
  animation: fade-in 0.25s ease-out;
}

div[data-state='closed'] .panel {
  animation: fade-out 0.25s ease-in;
}
</style>
