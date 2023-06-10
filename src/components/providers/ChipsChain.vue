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
  gap: 8px;
}

.item {
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  transition: all 0.25s ease-in-out;
  border: 1px solid #ccc;
  border-radius: 16px;
  opacity: 0.6;
  cursor: pointer;
}

.item:hover {
  opacity: 1;
}

.item.active {
  border-color: var(--color-accent-secondary);
  opacity: 1;
}
</style>
