<template>
  <div class="wrapper">
    <h2>Methods</h2>
    <div class="list">
      <div
        v-for="(supportStatus, method) in methods"
        :key="method"
        class="item"
      >
        <IconSuccess
          class="icon"
          :class="{
            grayscale: supportStatus === 'unsupported',
            dimmed: supportStatus === 'unknown',
          }"
        />
        <div>
          {{ method }}
          <span
            v-if="supportStatus === 'unknown'"
            class="label"
          >
            unknown
          </span>
          <span
            v-else-if="supportStatus === 'unsupported'"
            class="label"
          >
            unsupported
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSuccess from '@/components/__common/icon/Success.vue';
import { MethodId } from '@/utils/methods';
import { SupportStatus } from '@/utils/providers';

defineProps<{
  methods: Record<MethodId, SupportStatus>;
}>();
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

.icon.grayscale {
  filter: grayscale(1);
}

.icon.dimmed {
  opacity: 0.4;
}

.label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}
</style>
