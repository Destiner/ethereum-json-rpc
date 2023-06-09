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

const CHAINS: Chain[] = [ETHEREUM, OPTIMISM, POLYGON, ARBITRUM];

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

function getChainId(chainId: Chain): number {
  const data = getChainData(chainId);
  return data.id;
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
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  ARBITRUM,
  UNKNOWN_CHAIN,
  getChainData,
  getChainId,
  getChainName,
};
export type { Chain };
