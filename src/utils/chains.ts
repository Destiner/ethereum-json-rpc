import { Chain as ChainData } from 'viem';
import { mainnet, optimism, polygon, arbitrum } from 'viem/chains';

const ETHEREUM = 'ethereum';
const OPTIMISM = 'optimism';
const POLYGON = 'polygon';
const ARBITRUM = 'arbitrum';
const UNKNOWN_CHAIN = 'unknown';

type Chain =
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof ARBITRUM;

type ChainId =
  | typeof mainnet.id
  | typeof optimism.id
  | typeof polygon.id
  | typeof arbitrum.id;

const CHAINS: Chain[] = [ETHEREUM, OPTIMISM, POLYGON, ARBITRUM];
const CHAIN_IDS: ChainId[] = [mainnet.id, optimism.id, polygon.id, arbitrum.id];

function getChainName(chain: Chain | typeof UNKNOWN_CHAIN): string {
  switch (chain) {
    case ETHEREUM:
      return mainnet.name;
    case OPTIMISM:
      return optimism.name;
    case POLYGON:
      return polygon.name;
    case ARBITRUM:
      return arbitrum.name;
    case UNKNOWN_CHAIN:
      return 'Unknown';
  }
}

function getChainById(chainId: ChainId): Chain {
  switch (chainId) {
    case mainnet.id:
      return ETHEREUM;
    case optimism.id:
      return OPTIMISM;
    case polygon.id:
      return POLYGON;
    case arbitrum.id:
      return ARBITRUM;
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
    case OPTIMISM:
      return optimism;
    case POLYGON:
      return polygon;
    case ARBITRUM:
      return arbitrum;
  }
}

export {
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
export type { Chain, ChainId };
