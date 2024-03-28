import {
  AlchemyChain,
  AnkrChain,
  BlastChain,
  CloudflareChain,
  InfuraChain,
  LlamaNodesChain,
  OneRpcChain,
  PublicNodeChain,
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
  tenderly,
} from 'evm-providers';

import providers from '@/data/providers.json';

import { ChainId } from './chains';
import { MethodId } from './methods';

const ALCHEMY = 'alchemy';
const ANKR = 'ankr';
const BLAST_API = 'blast';
const CLOUDFLARE = 'cloudflare';
const DRPC = 'drpc';
const INFURA = 'infura';
const LLAMA_NODES = 'llamaNodes';
const ONE_RPC = 'oneRpc';
const PUBLIC_NODE = 'publicNode';
const TENDERLY = 'tenderly';

type Provider =
  | typeof ALCHEMY
  | typeof ANKR
  | typeof BLAST_API
  | typeof CLOUDFLARE
  | typeof DRPC
  | typeof INFURA
  | typeof LLAMA_NODES
  | typeof ONE_RPC
  | typeof PUBLIC_NODE
  | typeof TENDERLY;

const PROVIDERS: Provider[] = [
  ALCHEMY,
  ANKR,
  BLAST_API,
  CLOUDFLARE,
  DRPC,
  INFURA,
  LLAMA_NODES,
  ONE_RPC,
  PUBLIC_NODE,
  TENDERLY,
];

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
    case CLOUDFLARE:
      return cloudflare(chain as CloudflareChain);
    case DRPC:
      return drpc(chain);
    case INFURA:
      return infura(chain as InfuraChain, 'API_KEY');
    case LLAMA_NODES:
      return llamaNodes(chain as LlamaNodesChain, 'PROJECT_ID');
    case ONE_RPC:
      return oneRpc(chain as OneRpcChain);
    case PUBLIC_NODE:
      return publicNode(chain as PublicNodeChain);
    case TENDERLY:
      return tenderly(chain as TenderlyChain, 'ACCESS_KEY');
  }
}

export {
  ALCHEMY,
  ANKR,
  BLAST_API,
  CLOUDFLARE,
  DRPC,
  INFURA,
  LLAMA_NODES,
  ONE_RPC,
  PUBLIC_NODE,
  TENDERLY,
  FEATURES,
  PROVIDERS,
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
