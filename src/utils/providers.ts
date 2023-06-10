import { Chain } from './chains';

const ALCHEMY = 'alchemy';
const INFURA = 'infura';
const ANKR = 'ankr';
const QUICKNODE = 'quicknode';
const CLOUDFLARE = 'cloudflare';
const LLAMA = 'llama';
const POKT = 'pokt';
const BLAST = 'blast';

type Provider =
  | typeof ALCHEMY
  | typeof INFURA
  | typeof ANKR
  | typeof QUICKNODE
  | typeof CLOUDFLARE
  | typeof LLAMA
  | typeof POKT
  | typeof BLAST;

const PROVIDERS: Provider[] = [
  ALCHEMY,
  INFURA,
  ANKR,
  QUICKNODE,
  CLOUDFLARE,
  LLAMA,
  POKT,
  BLAST,
];

type Tier = 'no_key' | 'free_key' | 'paid_key';

type Feature = 'websocket' | 'archive_node' | 'debug' | 'traces' | 'erigon';

interface ProviderData {
  id: Provider;
  name: string;
  latency: number;
  tiers: Tier[];
  features: Feature[];
  endpoints: Record<Chain, string | null>;
}

function getProviderData(provider: Provider): ProviderData {
  switch (provider) {
    case ALCHEMY:
      return {
        id: 'alchemy',
        name: 'Alchemy',
        latency: 123,
        tiers: ['free_key', 'paid_key'],
        features: ['websocket', 'archive_node', 'debug', 'traces'],
        endpoints: {
          ethereum: 'https://eth-mainnet.g.alchemy.com/v2',
          polygon: 'https://polygon-mainnet.g.alchemy.com/v2',
          optimism: 'https://opt-mainnet.g.alchemy.com/v2',
          arbitrum: 'https://arb-mainnet.g.alchemy.com/v2',
        },
      };
    case INFURA:
      return {
        id: 'infura',
        name: 'Infura',
        latency: 132,
        tiers: ['free_key', 'paid_key'],
        features: ['websocket', 'archive_node', 'debug'],
        endpoints: {
          ethereum: 'https://mainnet.infura.io/v3',
          polygon: 'https://polygon-mainnet.infura.io/v3',
          optimism: 'https://optimism-mainnet.infura.io/v3',
          arbitrum: 'https://arbitrum-mainnet.infura.io/v3',
        },
      };
    case ANKR:
      return {
        id: 'ankr',
        name: 'Ankr',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: 'https://rpc.ankr.com/eth',
          polygon: 'https://rpc.ankr.com/polygon',
          optimism: 'https://rpc.ankr.com/optimism',
          arbitrum: 'https://rpc.ankr.com/arbitrum',
        },
      };
    case QUICKNODE:
      return {
        id: 'quicknode',
        name: 'QuickNode',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: '',
          polygon: '',
          optimism: '',
          arbitrum: '',
        },
      };
    case CLOUDFLARE:
      return {
        id: 'cloudflare',
        name: 'Cloudflare',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: 'https://cloudflare-eth.com',
          polygon: null,
          optimism: null,
          arbitrum: null,
        },
      };
    case LLAMA:
      return {
        id: 'llama',
        name: 'LlamaNodes',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: 'https://eth.llamarpc.com/rpc',
          polygon: 'https://polygon.llamarpc.com/rpc',
          optimism: null,
          arbitrum: null,
        },
      };
    case POKT:
      return {
        id: 'pokt',
        name: 'Pokt',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: 'https://eth-mainnet.gateway.pokt.network/v1/lb',
          polygon: 'https://poly-mainnet.gateway.pokt.network/v1/lb',
          optimism: 'https://optimism-mainnet.gateway.pokt.network/v1/lb',
          arbitrum: 'https://arbitrum-one.gateway.pokt.network/v1/lb',
        },
      };
    case BLAST:
      return {
        id: 'blast',
        name: 'BlastAPI',
        latency: 999,
        tiers: [],
        features: [],
        endpoints: {
          ethereum: 'https://eth-mainnet.blastapi.io/',
          polygon: 'https://polygon-mainnet.blastapi.io/',
          optimism: 'https://optimism-mainnet.blastapi.io/',
          arbitrum: 'https://arbitrum-one.blastapi.io/',
        },
      };
  }
}

export {
  ALCHEMY,
  INFURA,
  ANKR,
  QUICKNODE,
  CLOUDFLARE,
  LLAMA,
  POKT,
  BLAST,
  PROVIDERS,
  Tier,
  Feature,
  Provider,
  ProviderData,
  getProviderData,
};
