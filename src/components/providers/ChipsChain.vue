<template>
  <div class="list">
    <div
      v-for="chain in CHAINS"
      :key="chain"
      class="item"
      :class="{ active: modelValue === chain }"
      @click="handleItemClick(chain)"
    >
      <IconChain
        class="icon"
        :chain="chain"
      />
      {{ getChainName(chain) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import IconChain from '@/components/__common/icon/chain/IconChain.vue';
import { CHAINS, Chain, getChainName } from '@/utils/chains';

defineProps<{
  modelValue: Chain;
}>();

const emit = defineEmits<{
  'update:modelValue': [chain: Chain];
}>();

function handleItemClick(chain: Chain): void {
  emit('update:modelValue', chain);
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}

.list {
  display: flex;
  gap: var(--spacing-normal);
}

.item {
  display: flex;
  gap: var(--spacing-small);
  padding: 6px 10px;
  transition: all 0.25s ease-in-out;
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  font-size: var(--font-size-normal);
  cursor: pointer;
}

.item:hover {
  border-color: var(--color-border-secondary);
}

.item.active {
  border-color: var(--color-border-secondary);
  background: var(--color-bg-secondary);
}
</style>
