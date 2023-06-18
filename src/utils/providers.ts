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

interface Features {
  websockets: boolean;
  latestState: boolean;
  latestEvents: boolean;
  historicalState: boolean;
  historicalEvents: boolean;
  debugMethods: {
    traceCall: boolean;
    traceTransaction: boolean;
    traceBlock: boolean;
  };
  traceMethods: {
    block: boolean;
    call: boolean;
    filter: boolean;
    rawTransaction: boolean;
    replayBlockTransactions: boolean;
    replayTransaction: boolean;
    transaction: boolean;
  };
  erigonMethods: {
    getHeaderByHash: boolean;
    getBlockReceiptsByBlockHash: boolean;
    getHeaderByNumber: boolean;
  };
}
type Feature = keyof Features;

type FeatureSupportType = 'full' | 'partial' | 'none';

function getFeatureSupportType(
  features: Features,
  feature: Feature,
): FeatureSupportType {
  const featureValue = features[feature];
  if (typeof featureValue === 'boolean') {
    return featureValue ? 'full' : 'none';
  }
  if (Object.values(featureValue).every((value) => value)) {
    return 'full';
  }
  if (Object.values(featureValue).some((value) => value)) {
    return 'partial';
  }
  return 'none';
}

interface ProviderData {
  id: Provider;
  name: string;
  latency: number;
  tiers: Tier[];
  features: Features;
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
        features: {
          websockets: true,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: false,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: true,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: true,
          },
        },
        endpoints: {
          ethereum: 'https://eth-mainnet.g.alchemy.com/v2/<API_KEY>',
          polygon: 'https://polygon-mainnet.g.alchemy.com/v2/<API_KEY>',
          optimism: 'https://opt-mainnet.g.alchemy.com/v2/<API_KEY>',
          arbitrum: 'https://arb-mainnet.g.alchemy.com/v2/<API_KEY>',
        },
      };
    case INFURA:
      return {
        id: 'infura',
        name: 'Infura',
        latency: 132,
        tiers: ['free_key', 'paid_key'],
        features: {
          websockets: false,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: false,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: false,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: false,
          },
        },
        endpoints: {
          ethereum: 'https://mainnet.infura.io/v3/<API_KEY>',
          polygon: 'https://polygon-mainnet.infura.io/v3/<API_KEY>',
          optimism: 'https://optimism-mainnet.infura.io/v3/<API_KEY>',
          arbitrum: 'https://arbitrum-mainnet.infura.io/v3/<API_KEY>',
        },
      };
    case ANKR:
      return {
        id: 'ankr',
        name: 'Ankr',
        latency: 999,
        tiers: ['no_key', 'free_key', 'paid_key'],
        features: {
          websockets: false,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: true,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: true,
          },
          erigonMethods: {
            getHeaderByHash: true,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: false,
          },
        },
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
        tiers: ['free_key', 'paid_key'],
        features: {
          websockets: true,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: false,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: true,
            getBlockReceiptsByBlockHash: true,
            getHeaderByNumber: true,
          },
        },
        endpoints: {
          ethereum: 'https://<PROJECT_ID>.discover.quiknode.pro/<API_KEY>',
          polygon: 'https://<PROJECT_ID>.matic.quiknode.pro/<API_KEY>',
          optimism: 'https://<PROJECT_ID>.optimism.quiknode.pro/<API_KEY>',
          arbitrum:
            'https://<PROJECT_ID>.arbitrum-mainnet.quiknode.pro/<API_KEY>',
        },
      };
    case CLOUDFLARE:
      return {
        id: 'cloudflare',
        name: 'Cloudflare',
        latency: 999,
        tiers: ['no_key', 'free_key', 'paid_key'],
        features: {
          websockets: false,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: false,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: false,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: false,
          },
        },
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
        tiers: ['free_key', 'paid_key'],
        features: {
          websockets: false,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: true,
            traceBlock: true,
          },
          traceMethods: {
            block: true,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: true,
          },
          erigonMethods: {
            getHeaderByHash: true,
            getBlockReceiptsByBlockHash: true,
            getHeaderByNumber: true,
          },
        },
        endpoints: {
          ethereum: 'https://eth.llamarpc.com/rpc/<API_KEY>',
          polygon: 'https://polygon.llamarpc.com/rpc/<API_KEY>',
          optimism: null,
          arbitrum: null,
        },
      };
    case POKT:
      return {
        id: 'pokt',
        name: 'Pokt',
        latency: 999,
        tiers: ['free_key', 'paid_key'],
        features: {
          websockets: false,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: true,
            traceBlock: false,
          },
          traceMethods: {
            block: true,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: true,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: true,
          },
        },
        endpoints: {
          ethereum: 'https://eth-mainnet.gateway.pokt.network/v1/lb/<API_KEY>',
          polygon: 'https://poly-mainnet.gateway.pokt.network/v1/lb/<API_KEY>',
          optimism:
            'https://optimism-mainnet.gateway.pokt.network/v1/lb/<API_KEY>',
          arbitrum: 'https://arbitrum-one.gateway.pokt.network/v1/lb/<API_KEY>',
        },
      };
    case BLAST:
      return {
        id: 'blast',
        name: 'BlastAPI',
        latency: 999,
        tiers: ['free_key', 'paid_key'],
        features: {
          websockets: true,
          latestState: true,
          latestEvents: true,
          historicalState: true,
          historicalEvents: true,
          debugMethods: {
            traceCall: false,
            traceTransaction: false,
            traceBlock: false,
          },
          traceMethods: {
            block: false,
            call: false,
            filter: false,
            rawTransaction: false,
            replayBlockTransactions: false,
            replayTransaction: false,
            transaction: false,
          },
          erigonMethods: {
            getHeaderByHash: false,
            getBlockReceiptsByBlockHash: false,
            getHeaderByNumber: false,
          },
        },
        endpoints: {
          ethereum: 'https://eth-mainnet.blastapi.io/<API_KEY>',
          polygon: 'https://polygon-mainnet.blastapi.io/<API_KEY>',
          optimism: 'https://optimism-mainnet.blastapi.io/<API_KEY>',
          arbitrum: 'https://arbitrum-one.blastapi.io/<API_KEY>',
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
  Features,
  FeatureSupportType,
  Provider,
  ProviderData,
  getProviderData,
  getFeatureSupportType,
};
