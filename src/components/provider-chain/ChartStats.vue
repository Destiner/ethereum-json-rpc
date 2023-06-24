<template>
  <div class="wrapper">
    <h2>Stats</h2>
    <div class="chart">
      <div class="selectors">
        <EthSelect
          v-model="metric"
          :options="metricOptions"
        />
        <EthSelect
          v-model="method"
          :options="methodOptions"
        />
      </div>
      <EthPlot :options="plotOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Plot from '@observablehq/plot';
import { computed, ref } from 'vue';

import EthPlot from '@/components/__common/EthPlot.vue';
import EthSelect from '@/components/__common/EthSelect.vue';
import {
  StatMethod,
  StatMetric,
  Stats,
  MethodStatsRow,
} from '@/utils/providers';

const props = defineProps<{
  stats: Stats;
}>();

const metric = ref<StatMetric>('throughput');
const metricOptions: {
  value: StatMetric;
  label: string;
}[] = [
  { value: 'success_rate', label: 'Success Rate' },
  { value: 'throughput', label: 'Throughput' },
  { value: 'latency_mean', label: 'Latency, mean' },
  { value: 'latency_p50', label: 'Latency, p50' },
  { value: 'latency_p90', label: 'Latency, p90' },
];

const method = ref<StatMethod>('eth_getBalance');
const methodOptions: {
  value: StatMethod;
  label: string;
}[] = [
  { value: 'eth_call', label: 'eth_call' },
  { value: 'eth_getBalance', label: 'eth_getBalance' },
  { value: 'eth_getBlockByNumber', label: 'eth_getBlockByNumber' },
  { value: 'eth_getCode', label: 'eth_getCode' },
];

const plotOptions = computed<Plot.PlotOptions>(() => {
  function getDomain(metric: StatMetric): [number, number] | undefined {
    switch (metric) {
      case 'success_rate':
        return [0, 1];
      case 'throughput':
      case 'latency_mean':
      case 'latency_p50':
      case 'latency_p90':
        return undefined;
    }
  }
  function getYAxisData(
    metric: StatMetric,
  ): Omit<keyof MethodStatsRow, 'requestRate'> {
    switch (metric) {
      case 'success_rate':
        return 'successRate';
      case 'throughput':
        return 'throughput';
      case 'latency_mean':
        return 'latencyMean';
      case 'latency_p50':
        return 'latencyP50';
      case 'latency_p90':
        return 'latencyP90';
    }
  }
  function getYAxisLabel(metric: StatMetric): string {
    switch (metric) {
      case 'success_rate':
        return 'Success Rate';
      case 'throughput':
        return 'Throughput, req/s';
      case 'latency_mean':
        return 'Latency, ms';
      case 'latency_p50':
        return 'Latency, ms';
      case 'latency_p90':
        return 'Latency, ms';
    }
  }
  function getYAxisTickFormat(metric: StatMetric): (d: number) => string {
    switch (metric) {
      case 'success_rate':
        return (d) => `${d * 100}%`;
      case 'throughput':
        return (d) => `${d / 1000}K`;
      case 'latency_mean':
      case 'latency_p50':
      case 'latency_p90':
        return (d) => `${d * 1000}`;
    }
  }
  return {
    x: { grid: true, type: 'log' },
    y: { grid: true, domain: getDomain(metric.value) },
    marks: [
      Plot.line(props.stats[method.value], {
        x: 'requestRate',
        y: getYAxisData(metric.value),
      }),
      Plot.axisY({
        label: getYAxisLabel(metric.value),
        tickFormat: getYAxisTickFormat(metric.value),
      }),
      Plot.axisX({
        label: 'Request Rate',
      }),
    ],
    width: 1000,
  };
});
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

.chart {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  padding: 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
}

.selectors {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: row;
  align-items: center;
}
</style>
