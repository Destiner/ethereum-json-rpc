import {
  AlchemyChain,
  AnkrChain,
  BlastChain,
  CloudflareChain,
  DrpcChain,
  InfuraChain,
  LlamaNodesChain,
  OneRpcChain,
  PublicNodeChain,
  QuickNodeChain,
  TenderlyChain,
  alchemy,
  ankr,
  blast,
  cloudflare,
  drpc,
  infura,
  llamaNodes,
  oneRpc,
  publicNode,
  quicknode,
  tenderly,
} from 'evm-providers';

import providers from '@/data/providers.json';

import { ChainId } from './chains';
import { MethodId } from './methods';

const ALCHEMY = 'alchemy';
const ANKR = 'ankr';
const BLAST_API = 'blast';
const CHAINSTACK = 'chainstack';
const CLOUDFLARE = 'cloudflare';
const DRPC = 'drpc';
const INFURA = 'infura';
const LLAMA_NODES = 'llamaNodes';
const ONE_RPC = 'oneRpc';
const PUBLIC_NODE = 'publicNode';
const QUICK_NODE = 'quickNode';
const TENDERLY = 'tenderly';

type Provider =
  | typeof ALCHEMY
  | typeof ANKR
  | typeof BLAST_API
  | typeof CHAINSTACK
  | typeof CLOUDFLARE
  | typeof DRPC
  | typeof INFURA
  | typeof LLAMA_NODES
  | typeof ONE_RPC
  | typeof PUBLIC_NODE
  | typeof QUICK_NODE
  | typeof TENDERLY;

const PROVIDERS: Provider[] = [
  ALCHEMY,
  ANKR,
  BLAST_API,
  CHAINSTACK,
  CLOUDFLARE,
  DRPC,
  INFURA,
  LLAMA_NODES,
  ONE_RPC,
  PUBLIC_NODE,
  QUICK_NODE,
  TENDERLY,
];

const CHAINSTACK_ENDPOINT_SLUGS: Partial<Record<ChainId, string>> = {
  1: 'ethereum-mainnet',
  10: 'optimism-mainnet',
  56: 'bsc-mainnet',
  97: 'bsc-testnet',
  100: 'gnosis-mainnet',
  137: 'polygon-mainnet',
  250: 'fantom-mainnet',
  300: 'zksync-sepolia',
  324: 'zksync-mainnet',
  43113: 'avalanche-fuji',
  43114: 'avalanche-mainnet',
  80002: 'polygon-amoy',
  8453: 'base-mainnet',
  84532: 'base-sepolia',
  10200: 'gnosis-chiado',
  1101: 'polygon-zkevm-mainnet',
  11155111: 'ethereum-sepolia',
  11155420: 'optimism-sepolia',
  17000: 'ethereum-holesky',
  42161: 'arbitrum-mainnet',
  421614: 'arbitrum-sepolia',
  534351: 'scroll-sepolia',
  534352: 'scroll-mainnet',
  59144: 'linea-mainnet',
  7777777: 'zora-mainnet',
  4002: 'fantom-testnet',
};

type SupportStatus = 'supported' | 'unsupported' | 'unknown';

interface Features {
  websockets: SupportStatus;
  latestState: SupportStatus;
  latestEvents: SupportStatus;
  historicalState: SupportStatus;
  historicalEvents: SupportStatus;
}
type Feature = keyof Features;

const FEATURES: Feature[] = [
  'websockets',
  'latestState',
  'latestEvents',
  'historicalState',
  'historicalEvents',
];

type Methods = Record<MethodId, SupportStatus>;

interface ProviderChainData {
  features: Features;
  methods: Methods;
  timestamp: number;
}

type ProviderRegistry = Record<
  Provider,
  Partial<Record<ChainId, ProviderChainData>>
>;

function getProviderRegistry(): ProviderRegistry {
  return providers as ProviderRegistry;
}

function getProviderName(provider: Provider): string {
  switch (provider) {
    case ALCHEMY:
      return 'Alchemy';
    case ANKR:
      return 'Ankr';
    case BLAST_API:
      return 'Blast';
    case CHAINSTACK:
      return 'Chainstack';
    case CLOUDFLARE:
      return 'Cloudflare';
    case DRPC:
      return 'dRPC';
    case INFURA:
      return 'Infura';
    case LLAMA_NODES:
      return 'Llama Nodes';
    case ONE_RPC:
      return '1RPC';
    case PUBLIC_NODE:
      return 'Public Node';
    case QUICK_NODE:
      return 'QuickNode';
    case TENDERLY:
      return 'Tenderly';
  }
}

function getEndpoint(provider: Provider, chain: ChainId): string | null {
  switch (provider) {
    case ALCHEMY:
      return alchemy(chain as AlchemyChain, 'API_KEY');
    case ANKR:
      return ankr(chain as AnkrChain);
    case BLAST_API:
      return blast(chain as BlastChain, 'PROJECT_ID');
    case CHAINSTACK: {
      const slug = CHAINSTACK_ENDPOINT_SLUGS[chain];
      if (!slug) {
        return 'https://ideas.chainstack.com/';
      }
      return `https://${slug}.core.chainstack.com/ACCESS_KEY`;
    }
    case CLOUDFLARE:
      return cloudflare(chain as CloudflareChain);
    case DRPC:
      return drpc(chain as DrpcChain);
    case INFURA:
      return infura(chain as InfuraChain, 'API_KEY');
    case LLAMA_NODES:
      return llamaNodes(chain as LlamaNodesChain, 'PROJECT_ID');
    case ONE_RPC:
      return oneRpc(chain as OneRpcChain);
    case PUBLIC_NODE:
      return publicNode(chain as PublicNodeChain);
    case QUICK_NODE:
      return quicknode(chain as QuickNodeChain, 'APP_NAME', 'APP_KEY');
    case TENDERLY:
      return tenderly(chain as TenderlyChain, 'ACCESS_KEY');
  }
}

export {
  ALCHEMY,
  ANKR,
  BLAST_API,
  CHAINSTACK,
  CLOUDFLARE,
  DRPC,
  INFURA,
  LLAMA_NODES,
  ONE_RPC,
  PUBLIC_NODE,
  QUICK_NODE,
  TENDERLY,
  FEATURES,
  PROVIDERS,
  CHAINSTACK_ENDPOINT_SLUGS,
  getProviderRegistry,
  getProviderName,
  getEndpoint,
};
export type {
  Feature,
  Features,
  Provider,
  ProviderChainData,
  Methods,
  SupportStatus,
};
