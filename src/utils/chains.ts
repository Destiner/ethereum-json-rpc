import { Chain as ChainData } from 'viem';
import {
  mainnet,
  optimism,
  polygon,
  arbitrum,
  base,
  zkSync,
  zora,
} from 'viem/chains';

const ETHEREUM = 'ethereum';
const ARBITRUM = 'arbitrum';
const OPTIMISM = 'optimism';
const BASE = 'base';
const ZORA = 'zora';
const POLYGON = 'polygon';
const ZKSYNC_ERA = 'zksync-era';
const UNKNOWN_CHAIN = 'unknown';

type ReferenceChain =
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof ARBITRUM;

const REFERENCE_CHAINS: ReferenceChain[] = [
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  ARBITRUM,
];

type Chain =
  | typeof ETHEREUM
  | typeof ARBITRUM
  | typeof OPTIMISM
  | typeof BASE
  | typeof ZORA
  | typeof POLYGON
  | typeof ZKSYNC_ERA;

type ChainId =
  | typeof mainnet.id
  | typeof arbitrum.id
  | typeof optimism.id
  | typeof base.id
  | typeof zora.id
  | typeof polygon.id
  | typeof zkSync.id;

const CHAINS: Chain[] = [
  ETHEREUM,
  ARBITRUM,
  OPTIMISM,
  BASE,
  ZORA,
  POLYGON,
  ZKSYNC_ERA,
];
const CHAIN_IDS: ChainId[] = [
  mainnet.id,
  arbitrum.id,
  optimism.id,
  base.id,
  zora.id,
  polygon.id,
  zkSync.id,
];

function getChainName(chain: Chain | typeof UNKNOWN_CHAIN): string {
  switch (chain) {
    case ETHEREUM:
      return mainnet.name;
    case ARBITRUM:
      return arbitrum.name;
    case OPTIMISM:
      return optimism.name;
    case BASE:
      return base.name;
    case ZORA:
      return zora.name;
    case POLYGON:
      return polygon.name;
    case ZKSYNC_ERA:
      return zkSync.name;
    case UNKNOWN_CHAIN:
      return 'Unknown';
  }
}

function getChainById(chainId: ChainId): Chain {
  switch (chainId) {
    case mainnet.id:
      return ETHEREUM;
    case arbitrum.id:
      return ARBITRUM;
    case optimism.id:
      return OPTIMISM;
    case base.id:
      return BASE;
    case zora.id:
      return ZORA;
    case polygon.id:
      return POLYGON;
    case zkSync.id:
      return ZKSYNC_ERA;
  }
}

function getChainId(chain: Chain): ChainId {
  const data = getChainData(chain);
  return data.id as ChainId;
}

function getChainData(chain: Chain): ChainData {
  switch (chain) {
    case ETHEREUM:
      return mainnet;
    case ARBITRUM:
      return arbitrum;
    case OPTIMISM:
      return optimism;
    case BASE:
      return base;
    case ZORA:
      return zora;
    case POLYGON:
      return polygon;
    case ZKSYNC_ERA:
      return zkSync;
  }
}

export {
  REFERENCE_CHAINS,
  CHAINS,
  CHAIN_IDS,
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  ARBITRUM,
  UNKNOWN_CHAIN,
  getChainData,
  getChainById,
  getChainId,
  getChainName,
};
export type { Chain, ChainId, ReferenceChain };
