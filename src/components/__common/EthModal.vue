<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      class="dialog"
      @close="close()"
    >
      <TransitionChild
        as="template"
        enter="backdrop-enter"
        enter-from="backdrop-enter-from"
        enter-to="backdrop-enter-to"
        leave="backdrop-leave"
        leave-from="backdrop-leave-from"
        leave-to="backdrop-leave-to"
      >
        <div
          class="backdrop"
          aria-hidden="true"
        />
      </TransitionChild>
      <div class="body">
        <IconCross
          class="button-close"
          @click="handleCrossClick"
        />
        <TransitionChild
          as="template"
          enter="panel-enter"
          enter-from="panel-enter-from"
          enter-to="panel-enter-to"
          leave="panel-leave"
          leave-from="panel-leave-form"
          leave-to="panel-leave-to"
        >
          <DialogPanel
            as="div"
            class="panel"
          >
            <slot />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import IconCross from './icon/Cross.vue';

defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{ (e: 'close'): void }>();

function close(): void {
  emit('close');
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

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000000c0;
}

.body {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: end;
  justify-content: center;
}

.backdrop-enter {
  transition: all 200ms ease-out;
}

.backdrop-enter-from {
  opacity: 0;
}

.backdrop-enter-to {
  opacity: 1;
}

.backdrop-leave {
  transition: all 150ms ease-in;
}

.backdrop-leave-from {
  opacity: 1;
}

.backdrop-leave-to {
  opacity: 0;
}

.button-close {
  width: 28px;
  height: 28px;
  margin: 16px;
  opacity: 0.8;
}

@media (min-width: 768px) {
  .button-close {
    display: none;
  }
}

.panel-enter {
  transition: all 200ms ease-out;
}

.panel-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.panel-enter-to {
  transform: scale(1);
  opacity: 1;
}

.panel-leave {
  transition: all 150ms ease-in;
}

.panel-leave-form {
  transform: scale(1);
  opacity: 1;
}

.panel-leave-to {
  transform: scale(0.95);
  opacity: 0;
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

@media (min-width: 768px) {
  .panel {
    width: 450px;
    height: 60vh;
  }
}
</style>
