import { useStorage } from '@vueuse/core';
import { providers } from 'ethers';
import { Ref, computed, onMounted, ref, watch } from 'vue';

const STORAGE_KEY_PROVIDER = 'provider';

const ETHEREUM = 'ethereum';
const OPTIMISM = 'optimism';
const POLYGON = 'polygon';
const ARBITRUM = 'arbitrum';

const ALCHEMY = 'alchemy';
const INFURA = 'infura';
const ANKR = 'ankr';

type Chain =
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof ARBITRUM;

const CHAINS: Chain[] = [ETHEREUM, OPTIMISM, POLYGON, ARBITRUM];

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

interface UseProvider {
  provider: Ref<providers.BaseProvider>;
  options: Ref<Options>;
  url: Ref<string>;
  chain: Ref<Chain | null>;
}

function useProvider(): UseProvider {
  const options = useStorage(STORAGE_KEY_PROVIDER, DEFAULT_OPTIONS);
  const provider = computed(() => getProvider(options.value));
  const url = computed(
    () => (provider.value as providers.JsonRpcProvider).connection.url,
  );

  const chain = ref<Chain | null>(null);

  onMounted(() => {
    updateChain();
  });

  watch(provider, async () => {
    updateChain();
  });

  async function updateChain(): Promise<void> {
    switch (options.value.type) {
      case 'automatic': {
        chain.value = options.value.chain;
        break;
      }
      case 'custom': {
        const network = await provider.value.getNetwork();
        chain.value = getChain(network.chainId);
        break;
      }
      case 'preset': {
        chain.value = options.value.chain;
        break;
      }
    }
  }

  return { provider, options, url, chain };
}

function getProvider(options: Options): providers.BaseProvider {
  if (options.type === 'automatic') {
    const chainId = getChainId(options.chain);
    return new providers.InfuraProvider(chainId);
  }
  if (options.type === 'custom') {
    return new providers.JsonRpcProvider(options.url);
  }
  const chainId = getChainId(options.chain);
  const key = options.key === '' ? undefined : options.key;
  if (options.preset === 'alchemy') {
    return new providers.AlchemyProvider(chainId, key);
  }
  if (options.preset === 'infura') {
    return new providers.InfuraProvider(chainId, key);
  }
  if (options.preset === 'ankr') {
    return new providers.AnkrProvider(chainId, key);
  }
  return new providers.InfuraProvider();
}

function getChainId(chain: Chain): number {
  switch (chain) {
    case ETHEREUM:
      return 1;
    case OPTIMISM:
      return 10;
    case POLYGON:
      return 137;
    case ARBITRUM:
      return 42161;
  }
}

function getChain(chainId: number): Chain | null {
  const chain = CHAINS.find((chain) => getChainId(chain) === chainId);
  return chain || null;
}

export default useProvider;
export {
  ALCHEMY,
  ANKR,
  ARBITRUM,
  CHAINS,
  ETHEREUM,
  INFURA,
  OPTIMISM,
  POLYGON,
  Chain,
  Preset,
  PresetProviderOptions,
};
