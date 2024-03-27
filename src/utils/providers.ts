import { alchemy, ankr, cloudflare, drpc } from 'evm-providers';

import providers from '@/data/providers.json';

import { ChainId } from './chains';
import { MethodId } from './methods';

const ALCHEMY = 'alchemy';
const INFURA = 'infura';
const ANKR = 'ankr';
const QUICKNODE = 'quicknode';
const CLOUDFLARE = 'cloudflare';
const LLAMA = 'llama';
const POKT = 'pokt';
const BLAST = 'blast';
const DRPC = 'drpc';

type Provider =
  | typeof ALCHEMY
  // | typeof INFURA
  | typeof ANKR
  // | typeof QUICKNODE
  | typeof CLOUDFLARE
  // | typeof LLAMA
  // | typeof POKT
  // | typeof BLAST
  | typeof DRPC;

const PROVIDERS: Provider[] = [
  ALCHEMY,
  // INFURA,
  ANKR,
  // QUICKNODE,
  CLOUDFLARE,
  // LLAMA,
  // POKT,
  // BLAST,
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
    case CLOUDFLARE:
      return 'Cloudflare';
    case DRPC:
      return 'dRPC';
  }
}

function getEndpoint(provider: Provider, chain: ChainId): string | null {
  switch (provider) {
    case ALCHEMY:
      return alchemy(chain, 'API_KEY');
    case ANKR:
      return ankr(chain);
    case CLOUDFLARE:
      return cloudflare(chain as 1);
    case DRPC:
      return drpc(chain);
  }
}

export {
  ALCHEMY,
  ANKR,
  BLAST,
  CLOUDFLARE,
  DRPC,
  FEATURES,
  INFURA,
  LLAMA,
  POKT,
  PROVIDERS,
  QUICKNODE,
  Feature,
  Features,
  Provider,
  ProviderChainData,
  Methods,
  SupportStatus,
  getProviderRegistry,
  getProviderName,
  getEndpoint,
};
