import { useStorage } from '@vueuse/core';
import { PublicClient, createPublicClient, http } from 'viem';
import { Ref, computed, onMounted, ref, watch } from 'vue';

import {
  ARBITRUM,
  CHAINS,
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  getChainId,
  getChainData,
} from '@/utils/chains';
import type { Chain } from '@/utils/chains';

const STORAGE_KEY_PROVIDER = 'provider';

const ALCHEMY = 'alchemy';
const INFURA = 'infura';
const ANKR = 'ankr';

interface AutomaticProviderOptions {
  type: 'automatic';
  chain: Chain;
}

interface CustomProviderOptions {
  type: 'custom';
  url: string;
}

type Preset = typeof ALCHEMY | typeof INFURA | typeof ANKR;

interface PresetProviderOptions {
  type: 'preset';
  key: string;
  preset: Preset;
  chain: Chain;
}

type Options =
  | AutomaticProviderOptions
  | CustomProviderOptions
  | PresetProviderOptions;

const DEFAULT_OPTIONS: Options = {
  type: 'automatic',
  chain: ETHEREUM,
};

interface UseChain {
  client: Ref<PublicClient>;
  options: Ref<Options>;
  url: Ref<string>;
  chain: Ref<Chain | null>;
}

function useChain(): UseChain {
  const options = useStorage(STORAGE_KEY_PROVIDER, DEFAULT_OPTIONS);
  const url = computed(() => getUrlByOptions(options.value));
  const client = computed(() =>
    createPublicClient({
      transport: http(url.value),
    }),
  );

  const chain = ref<Chain | null>(null);

  onMounted(() => {
    updateChain();
  });

  watch(client, async () => {
    updateChain();
  });

  async function updateChain(): Promise<void> {
    switch (options.value.type) {
      case 'automatic': {
        chain.value = options.value.chain;
        break;
      }
      case 'custom': {
        const chainId = await client.value.getChainId();
        chain.value = getChain(chainId);
        break;
      }
      case 'preset': {
        chain.value = options.value.chain;
        break;
      }
    }
  }

  return { client, options, url, chain };
}

function getUrlByOptions(options: Options): string {
  if (options.type === 'automatic') {
    const chainData = getChainData(options.chain);
    return chainData.rpcUrls.default.http[0] as string;
  }
  if (options.type === 'custom') {
    return options.url;
  }
  const chainData = getChainData(options.chain);
  const key = options.key === '' ? undefined : options.key;
  if (options.preset === 'alchemy') {
    return chainData.rpcUrls.alchemy.http[0] + `/${key}`;
  }
  if (options.preset === 'infura') {
    return chainData.rpcUrls.infura.http[0] + `/${key}`;
  }
  if (options.preset === 'ankr') {
    switch (options.chain) {
      case ETHEREUM:
        return 'https://rpc.ankr.com/eth';
      case OPTIMISM:
        return 'https://rpc.ankr.com/optimism';
      case POLYGON:
        return 'https://rpc.ankr.com/polygon';
      case ARBITRUM:
        return 'https://rpc.ankr.com/arbitrum';
    }
  }
  return chainData.rpcUrls.infura.http[0];
}

function getChain(chainId: number): Chain | null {
  const chain = CHAINS.find((chain) => getChainId(chain) === chainId);
  return chain || null;
}

export default useChain;
export { ALCHEMY, ANKR, CHAINS, INFURA, Chain, Preset, PresetProviderOptions };
