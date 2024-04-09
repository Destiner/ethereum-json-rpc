import { Chain as ChainData } from 'viem';
import {
  mainnet,
  goerli,
  sepolia,
  holesky,
  arbitrum,
  arbitrumNova,
  arbitrumGoerli,
  arbitrumSepolia,
  optimism,
  optimismGoerli,
  optimismSepolia,
  base,
  baseGoerli,
  baseSepolia,
  zora,
  zoraSepolia,
  polygon,
  polygonMumbai,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmTestnet,
  polygonZkEvmCardona,
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  scroll,
  scrollTestnet,
  scrollSepolia,
  zkSync,
  zkSyncSepoliaTestnet,
  zkSyncTestnet,
  celo,
  celoAlfajores,
  linea,
  lineaTestnet,
  blast,
  blastSepolia,
  mantle,
  mantleTestnet,
  mode,
  modeTestnet,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  flare,
} from 'viem/chains';

const ETHEREUM = 'ethereum';
const GOERLI = 'goerli';
const SEPOLIA = 'sepolia';
const HOLESKY = 'holesky';
const ARBITRUM = 'arbitrum';
const ARBITRUM_NOVA = 'arbitrum-nova';
const ARBITRUM_GOERLI = 'arbitrum-goerli';
const ARBITRUM_SEPOLIA = 'arbitrum-sepolia';
const OPTIMISM = 'optimism';
const OPTIMISM_GOERLI = 'optimism-goerli';
const OPTIMISM_SEPOLIA = 'optimism-sepolia';
const BASE = 'base';
const BASE_GOERLI = 'base-goerli';
const BASE_SEPOLIA = 'base-sepolia';
const ZORA = 'zora';
const ZORA_SEPOLIA = 'zora-sepolia';
const POLYGON = 'polygon';
const POLYGON_MUMBAI = 'polygon-mumbai';
const POLYGON_AMOY = 'polygon-amoy';
const POLYGON_ZKEVM = 'polygon-zkevm';
const POLYGON_ZKEVM_TESTNET = 'polygon-zkevm-testnet';
const POLYGON_ZKEVM_CARDONA = 'polygon-zkevm-cardona';
const AVALANCHE_C = 'avalanche-c';
const AVALANCHE_FUJI = 'avalanche-fuji';
const GNOSIS = 'gnosis';
const GNOSIS_CHIADO = 'gnosis-chiado';
const SCROLL = 'scroll';
const SCROLL_ALPHA = 'scroll-alpha';
const SCROLL_SEPOLIA = 'scroll-sepolia';
const ZKSYNC_ERA = 'zksync-era';
const ZKSYNC_ERA_SEPOLIA = 'zksync-era-sepolia';
const ZKSYNC_ERA_GOERLI = 'zksync-era-goerli';
const CELO = 'celo';
const CELO_ALFAJORES = 'celo-alfajores';
const LINEA = 'linea';
const LINEA_GOERLI = 'linea-goerli';
const BLAST = 'blast';
const BLAST_SEPOLIA = 'blast-sepolia';
const MANTLE = 'mantle';
const MANTLE_GOERLI = 'mantle-goerli';
const MANTLE_SEPOLIA = 'mantle-sepolia';
const MODE = 'mode';
const MODE_SEPOLIA = 'mode-sepolia';
const BSC = 'bsc';
const BSC_TESTNET = 'bsc-testnet';
const FANTOM = 'fantom';
const FANTOM_TESTNET = 'fantom-testnet';
const MOONBASE_ALPHA = 'moonbase-alpha';
const MOONBEAM = 'moonbeam';
const MOONRIVER = 'moonriver';
const FLARE = 'flare';
const UNKNOWN_CHAIN = 'unknown';

type ReferenceChain =
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof BASE
  | typeof POLYGON
  | typeof ARBITRUM;

const REFERENCE_CHAINS: ReferenceChain[] = [
  ETHEREUM,
  OPTIMISM,
  BASE,
  POLYGON,
  ARBITRUM,
];

type Chain =
  | typeof ETHEREUM
  | typeof GOERLI
  | typeof SEPOLIA
  | typeof HOLESKY
  | typeof ARBITRUM
  | typeof ARBITRUM_NOVA
  | typeof ARBITRUM_GOERLI
  | typeof ARBITRUM_SEPOLIA
  | typeof OPTIMISM
  | typeof OPTIMISM_GOERLI
  | typeof OPTIMISM_SEPOLIA
  | typeof BASE
  | typeof BASE_GOERLI
  | typeof BASE_SEPOLIA
  | typeof ZORA
  | typeof ZORA_SEPOLIA
  | typeof POLYGON
  | typeof POLYGON_MUMBAI
  | typeof POLYGON_AMOY
  | typeof POLYGON_ZKEVM
  | typeof POLYGON_ZKEVM_TESTNET
  | typeof POLYGON_ZKEVM_CARDONA
  | typeof AVALANCHE_C
  | typeof AVALANCHE_FUJI
  | typeof GNOSIS
  | typeof GNOSIS_CHIADO
  | typeof SCROLL
  | typeof SCROLL_ALPHA
  | typeof SCROLL_SEPOLIA
  | typeof ZKSYNC_ERA
  | typeof ZKSYNC_ERA_SEPOLIA
  | typeof ZKSYNC_ERA_GOERLI
  | typeof CELO
  | typeof CELO_ALFAJORES
  | typeof LINEA
  | typeof LINEA_GOERLI
  | typeof BLAST
  | typeof BLAST_SEPOLIA
  | typeof MANTLE
  | typeof MANTLE_GOERLI
  | typeof MANTLE_SEPOLIA
  | typeof MODE
  | typeof MODE_SEPOLIA
  | typeof BSC
  | typeof BSC_TESTNET
  | typeof FANTOM
  | typeof FANTOM_TESTNET
  | typeof MOONBASE_ALPHA
  | typeof MOONBEAM
  | typeof MOONRIVER
  | typeof FLARE;

type ChainId =
  | typeof mainnet.id
  | typeof goerli.id
  | typeof sepolia.id
  | typeof holesky.id
  | typeof arbitrum.id
  | typeof arbitrumNova.id
  | typeof arbitrumGoerli.id
  | typeof arbitrumSepolia.id
  | typeof optimism.id
  | typeof optimismGoerli.id
  | typeof optimismSepolia.id
  | typeof base.id
  | typeof baseGoerli.id
  | typeof baseSepolia.id
  | typeof zora.id
  | typeof zoraSepolia.id
  | typeof polygon.id
  | typeof polygonMumbai.id
  | typeof polygonAmoy.id
  | typeof polygonZkEvm.id
  | typeof polygonZkEvmTestnet.id
  | typeof polygonZkEvmCardona.id
  | typeof avalanche.id
  | typeof avalancheFuji.id
  | typeof gnosis.id
  | typeof gnosisChiado.id
  | typeof scroll.id
  | typeof scrollTestnet.id
  | typeof scrollSepolia.id
  | typeof zkSync.id
  | typeof zkSyncSepoliaTestnet.id
  | typeof zkSyncTestnet.id
  | typeof celo.id
  | typeof celoAlfajores.id
  | typeof linea.id
  | typeof lineaTestnet.id
  | typeof blast.id
  | typeof blastSepolia.id
  | typeof mantle.id
  | typeof mantleTestnet.id
  | 5003
  | typeof mode.id
  | typeof modeTestnet.id
  | typeof bsc.id
  | typeof bscTestnet.id
  | typeof fantom.id
  | typeof fantomTestnet.id
  | typeof moonbaseAlpha.id
  | typeof moonbeam.id
  | typeof moonriver.id
  | typeof flare.id;

const CHAINS: Chain[] = [
  ETHEREUM,
  GOERLI,
  SEPOLIA,
  HOLESKY,
  ARBITRUM,
  ARBITRUM_NOVA,
  ARBITRUM_GOERLI,
  ARBITRUM_SEPOLIA,
  OPTIMISM,
  OPTIMISM_GOERLI,
  OPTIMISM_SEPOLIA,
  BASE,
  BASE_GOERLI,
  BASE_SEPOLIA,
  ZORA,
  ZORA_SEPOLIA,
  POLYGON,
  POLYGON_MUMBAI,
  POLYGON_AMOY,
  POLYGON_ZKEVM,
  POLYGON_ZKEVM_TESTNET,
  POLYGON_ZKEVM_CARDONA,
  AVALANCHE_C,
  AVALANCHE_FUJI,
  GNOSIS,
  GNOSIS_CHIADO,
  SCROLL,
  SCROLL_ALPHA,
  SCROLL_SEPOLIA,
  ZKSYNC_ERA,
  ZKSYNC_ERA_SEPOLIA,
  ZKSYNC_ERA_GOERLI,
  CELO,
  CELO_ALFAJORES,
  LINEA,
  LINEA_GOERLI,
  BLAST,
  BLAST_SEPOLIA,
  MANTLE,
  MANTLE_GOERLI,
  MANTLE_SEPOLIA,
  MODE,
  MODE_SEPOLIA,
  BSC,
  BSC_TESTNET,
  FANTOM,
  FANTOM_TESTNET,
  MOONBASE_ALPHA,
  MOONBEAM,
  MOONRIVER,
  FLARE,
];
const CHAIN_IDS: ChainId[] = [
  mainnet.id,
  goerli.id,
  sepolia.id,
  holesky.id,
  arbitrum.id,
  arbitrumNova.id,
  arbitrumGoerli.id,
  arbitrumSepolia.id,
  optimism.id,
  optimismGoerli.id,
  optimismSepolia.id,
  base.id,
  baseGoerli.id,
  baseSepolia.id,
  zora.id,
  zoraSepolia.id,
  polygon.id,
  polygonMumbai.id,
  polygonAmoy.id,
  polygonZkEvm.id,
  polygonZkEvmTestnet.id,
  polygonZkEvmCardona.id,
  avalanche.id,
  avalancheFuji.id,
  gnosis.id,
  gnosisChiado.id,
  scroll.id,
  scrollTestnet.id,
  scrollSepolia.id,
  zkSync.id,
  zkSyncSepoliaTestnet.id,
  zkSyncTestnet.id,
  celo.id,
  celoAlfajores.id,
  linea.id,
  lineaTestnet.id,
  blast.id,
  blastSepolia.id,
  mantle.id,
  mantleTestnet.id,
  5003,
  mode.id,
  modeTestnet.id,
  bsc.id,
  bscTestnet.id,
  fantom.id,
  fantomTestnet.id,
  moonbaseAlpha.id,
  moonbeam.id,
  moonriver.id,
  flare.id,
];

function getChainName(chain: Chain | typeof UNKNOWN_CHAIN): string {
  if (chain === UNKNOWN_CHAIN) {
    return 'Unknown';
  }
  const chainData = getChainData(chain);
  return chainData.name;
}

function getChainById(chainId: ChainId): Chain {
  switch (chainId) {
    case mainnet.id:
      return ETHEREUM;
    case goerli.id:
      return GOERLI;
    case sepolia.id:
      return SEPOLIA;
    case holesky.id:
      return HOLESKY;
    case arbitrum.id:
      return ARBITRUM;
    case arbitrumNova.id:
      return ARBITRUM_NOVA;
    case arbitrumGoerli.id:
      return ARBITRUM_GOERLI;
    case arbitrumSepolia.id:
      return ARBITRUM_SEPOLIA;
    case optimism.id:
      return OPTIMISM;
    case optimismGoerli.id:
      return OPTIMISM_GOERLI;
    case optimismSepolia.id:
      return OPTIMISM_SEPOLIA;
    case base.id:
      return BASE;
    case baseGoerli.id:
      return BASE_GOERLI;
    case baseSepolia.id:
      return BASE_SEPOLIA;
    case zora.id:
      return ZORA;
    case zoraSepolia.id:
      return ZORA_SEPOLIA;
    case polygon.id:
      return POLYGON;
    case polygonMumbai.id:
      return POLYGON_MUMBAI;
    case polygonAmoy.id:
      return POLYGON_AMOY;
    case polygonZkEvm.id:
      return POLYGON_ZKEVM;
    case polygonZkEvmTestnet.id:
      return POLYGON_ZKEVM_TESTNET;
    case polygonZkEvmCardona.id:
      return POLYGON_ZKEVM_CARDONA;
    case avalanche.id:
      return AVALANCHE_C;
    case avalancheFuji.id:
      return AVALANCHE_FUJI;
    case gnosis.id:
      return GNOSIS;
    case gnosisChiado.id:
      return GNOSIS_CHIADO;
    case scroll.id:
      return SCROLL;
    case scrollTestnet.id:
      return SCROLL_ALPHA;
    case scrollSepolia.id:
      return SCROLL_SEPOLIA;
    case zkSync.id:
      return ZKSYNC_ERA;
    case zkSyncSepoliaTestnet.id:
      return ZKSYNC_ERA_SEPOLIA;
    case zkSyncTestnet.id:
      return ZKSYNC_ERA_GOERLI;
    case celo.id:
      return CELO;
    case celoAlfajores.id:
      return CELO_ALFAJORES;
    case linea.id:
      return LINEA;
    case lineaTestnet.id:
      return LINEA_GOERLI;
    case blast.id:
      return BLAST;
    case blastSepolia.id:
      return BLAST_SEPOLIA;
    case mantle.id:
      return MANTLE;
    case mantleTestnet.id:
      return MANTLE_GOERLI;
    case 5003:
      return MANTLE_SEPOLIA;
    case mode.id:
      return MODE;
    case modeTestnet.id:
      return MODE_SEPOLIA;
    case bsc.id:
      return BSC;
    case bscTestnet.id:
      return BSC_TESTNET;
    case fantom.id:
      return FANTOM;
    case fantomTestnet.id:
      return FANTOM_TESTNET;
    case moonbaseAlpha.id:
      return MOONBASE_ALPHA;
    case moonbeam.id:
      return MOONBEAM;
    case moonriver.id:
      return MOONRIVER;
    case flare.id:
      return FLARE;
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
    case GOERLI:
      return goerli;
    case SEPOLIA:
      return sepolia;
    case HOLESKY:
      return holesky;
    case ARBITRUM:
      return arbitrum;
    case ARBITRUM_NOVA:
      return arbitrumNova;
    case ARBITRUM_GOERLI:
      return arbitrumGoerli;
    case ARBITRUM_SEPOLIA:
      return arbitrumSepolia;
    case OPTIMISM:
      return optimism;
    case OPTIMISM_GOERLI:
      return optimismGoerli;
    case OPTIMISM_SEPOLIA:
      return optimismSepolia;
    case BASE:
      return base;
    case BASE_GOERLI:
      return baseGoerli;
    case BASE_SEPOLIA:
      return baseSepolia;
    case ZORA:
      return zora;
    case ZORA_SEPOLIA:
      return zoraSepolia;
    case POLYGON:
      return polygon;
    case POLYGON_MUMBAI:
      return polygonMumbai;
    case POLYGON_AMOY:
      return polygonAmoy;
    case POLYGON_ZKEVM:
      return polygonZkEvm;
    case POLYGON_ZKEVM_TESTNET:
      return polygonZkEvmTestnet;
    case POLYGON_ZKEVM_CARDONA:
      return polygonZkEvmCardona;
    case AVALANCHE_C:
      return avalanche;
    case AVALANCHE_FUJI:
      return avalancheFuji;
    case GNOSIS:
      return gnosis;
    case GNOSIS_CHIADO:
      return gnosisChiado;
    case SCROLL:
      return scroll;
    case SCROLL_ALPHA:
      return scrollTestnet;
    case SCROLL_SEPOLIA:
      return scrollSepolia;
    case ZKSYNC_ERA:
      return zkSync;
    case ZKSYNC_ERA_SEPOLIA:
      return zkSyncSepoliaTestnet;
    case ZKSYNC_ERA_GOERLI:
      return zkSyncTestnet;
    case CELO:
      return celo;
    case CELO_ALFAJORES:
      return celoAlfajores;
    case LINEA:
      return linea;
    case LINEA_GOERLI:
      return lineaTestnet;
    case BLAST:
      return blast;
    case BLAST_SEPOLIA:
      return blastSepolia;
    case MANTLE:
      return mantle;
    case MANTLE_GOERLI:
      return mantleTestnet;
    case MANTLE_SEPOLIA:
      return {
        id: 5003,
        name: 'Mantle Sepolia',
        nativeCurrency: {
          name: 'Mantle Sepolia Ether',
          symbol: 'MSETH',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://rpc.mantle.sepolia.io'],
          },
        },
      };
    case MODE:
      return mode;
    case MODE_SEPOLIA:
      return modeTestnet;
    case BSC:
      return bsc;
    case BSC_TESTNET:
      return bscTestnet;
    case FANTOM:
      return fantom;
    case FANTOM_TESTNET:
      return fantomTestnet;
    case MOONBASE_ALPHA:
      return moonbaseAlpha;
    case MOONBEAM:
      return moonbeam;
    case MOONRIVER:
      return moonriver;
    case FLARE:
      return flare;
  }
}

export {
  REFERENCE_CHAINS,
  CHAINS,
  CHAIN_IDS,
  ETHEREUM,
  OPTIMISM,
  BASE,
  POLYGON,
  ARBITRUM,
  UNKNOWN_CHAIN,
  getChainData,
  getChainById,
  getChainId,
  getChainName,
};
export type { Chain, ChainId, ReferenceChain };
