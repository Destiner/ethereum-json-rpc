import 'dotenv/config';
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
  TenderlyChain,
  alchemy,
  ankr,
  blast,
  // chainstack,
  cloudflare,
  drpc,
  // gatewayFm,
  infura,
  llamaNodes,
  oneRpc,
  publicNode,
  // quicknode,
  // stackup,
  tenderly,
} from 'evm-providers';
import {
  PublicClient,
  createPublicClient,
  http,
  webSocket,
  zeroAddress,
  zeroHash,
} from 'viem';
import {
  arbitrum,
  arbitrumGoerli,
  arbitrumNova,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  baseSepolia,
  blastSepolia,
  bsc,
  bscTestnet,
  celo,
  celoAlfajores,
  fantom,
  fantomTestnet,
  flare,
  gnosis,
  gnosisChiado,
  goerli,
  holesky,
  linea,
  lineaTestnet,
  mainnet,
  mantle,
  mantleTestnet,
  mode,
  modeTestnet,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  optimism,
  optimismGoerli,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scroll,
  scrollSepolia,
  scrollTestnet,
  sepolia,
  zkSync,
  zkSyncSepoliaTestnet,
  zkSyncTestnet,
  zora,
  zoraSepolia,
} from 'viem/chains';

const alchemyApiKey = process.env.ALCHEMY_KEY as string;
const infuraApiKey = process.env.INFURA_KEY as string;
const llamaNodesProjectId = process.env.LLAMA_NODES_PROJECT_ID as string;
const blastProjectId = process.env.BLAST_PROJECT_ID as string;
const tenderlyAccessKey = process.env.TENDERLY_ACCESS_KEY as string;

type Status = 'supported' | 'unsupported' | 'unknown';

class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

interface Features {
  websockets: Status;
  latestState: Status;
  latestEvents: Status;
  historicalState: Status;
  historicalEvents: Status;
}

const ETHEREUM = mainnet.id;
const GOERLI = goerli.id;
const SEPOLIA = sepolia.id;
const HOLESKY = holesky.id;
const ARBITRUM = arbitrum.id;
const ARBITRUM_NOVA = arbitrumNova.id;
const ARBITRUM_GOERLI = arbitrumGoerli.id;
const ARBITRUM_SEPOLIA = arbitrumSepolia.id;
const OPTIMISM = optimism.id;
const OPTIMISM_GOERLI = optimismGoerli.id;
const OPTIMISM_SEPOLIA = optimismSepolia.id;
const BASE = base.id;
const BASE_GOERLI = baseGoerli.id;
const BASE_SEPOLIA = baseSepolia.id;
const ZORA = zora.id;
const ZORA_SEPOLIA = zoraSepolia.id;
const POLYGON = polygon.id;
const POLYGON_MUMBAI = polygonMumbai.id;
const POLYGON_AMOY = polygonAmoy.id;
const POLYGON_ZKEVM = polygonZkEvm.id;
const POLYGON_ZKEVM_TESTNET = polygonZkEvmTestnet.id;
const AVALANCHE_C = avalanche.id;
const AVALANCHE_FUJI = avalancheFuji.id;
const GNOSIS = gnosis.id;
const GNOSIS_CHIADO = gnosisChiado.id;
const SCROLL = scroll.id;
const SCROLL_ALPHA = scrollTestnet.id;
const SCROLL_SEPOLIA = scrollSepolia.id;
const ZKSYNC_ERA = zkSync.id;
const ZKSYNC_ERA_SEPOLIA = zkSyncSepoliaTestnet.id;
const ZKSYNC_ERA_GOERLI = zkSyncTestnet.id;
const CELO = celo.id;
const CELO_ALFAJORES = celoAlfajores.id;
const LINEA = linea.id;
const LINEA_GOERLI = lineaTestnet.id;
const BLAST = 81457;
const BLAST_SEPOLIA = blastSepolia.id;
const MANTLE = mantle.id;
const MANTLE_GOERLI = mantleTestnet.id;
const MANTLE_SEPOLIA = 5003;
const MODE = mode.id;
const MODE_SEPOLIA = modeTestnet.id;
const BSC = bsc.id;
const BSC_TESTNET = bscTestnet.id;
const FANTOM = fantom.id;
const FANTOM_TESTNET = fantomTestnet.id;
const MOONBASE_ALPHA = moonbaseAlpha.id;
const MOONBEAM = moonbeam.id;
const MOONRIVER = moonriver.id;
const FLARE = flare.id;

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

const ALCHEMY = 'alchemy';
const ANKR = 'ankr';
const BLAST_API = 'blast';
const CHAINSTACK = 'chainstack';
const CLOUDFLARE = 'cloudflare';
const DRPC = 'drpc';
const GATEWAY_FM = 'gatewayFm';
const INFURA = 'infura';
const LLAMA_NODES = 'llamaNodes';
const ONE_RPC = 'oneRpc';
const PUBLIC_NODE = 'publicNode';
const QUICK_NODE = 'quicknode';
const STACKUP = 'stackup';
const TENDERLY = 'tenderly';

type Provider =
  | typeof ALCHEMY
  | typeof ANKR
  | typeof BLAST_API
  | typeof CHAINSTACK
  | typeof CLOUDFLARE
  | typeof DRPC
  | typeof GATEWAY_FM
  | typeof INFURA
  | typeof LLAMA_NODES
  | typeof ONE_RPC
  | typeof PUBLIC_NODE
  | typeof QUICK_NODE
  | typeof STACKUP
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

function getProviderRpcUrl(
  provider: Provider,
  chain: Chain,
): string | undefined {
  switch (provider) {
    case ALCHEMY:
      return alchemy(chain as AlchemyChain, alchemyApiKey);
    case ANKR:
      return ankr(chain as AnkrChain);
    case BLAST_API:
      return blast(chain as BlastChain, blastProjectId);
    // case CHAINSTACK:
    //   return chainstack(chain);
    case CLOUDFLARE:
      return cloudflare(chain as CloudflareChain);
    case DRPC:
      return drpc(chain as DrpcChain);
    // case GATEWAY_FM:
    //   return gatewayFm(chain);
    case INFURA:
      return infura(chain as InfuraChain, infuraApiKey);
    case LLAMA_NODES:
      return llamaNodes(chain as LlamaNodesChain, llamaNodesProjectId);
    case ONE_RPC:
      return oneRpc(chain as OneRpcChain);
    case PUBLIC_NODE:
      return publicNode(chain as PublicNodeChain);
    // case QUICK_NODE:
    //   return quicknode(chain);
    // case STACKUP:
    //   return stackup();
    case TENDERLY:
      return tenderly(chain as TenderlyChain, tenderlyAccessKey);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

async function tryRequest(
  client: PublicClient,
  method: string,
  params: unknown[],
  timeout: number = 60,
): Promise<Status> {
  try {
    const requestPromise = client.request({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      method,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      params,
    });
    const timeoutPromise = new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new TimeoutError('Request timed out'));
      }, timeout * 1000);
    });
    await Promise.race([requestPromise, timeoutPromise]);
  } catch (e) {
    if (e instanceof TimeoutError) {
      return 'unknown';
    }
    return 'unsupported';
  }
  return 'supported';
}

async function getMethods(
  endpointUrl: string,
): Promise<Record<string, Status>> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  const methods: Record<string, Status> = {};
  methods['eth_chainId'] = await tryRequest(client, 'eth_chainId', []);
  methods['eth_blockNumber'] = await tryRequest(client, 'eth_blockNumber', []);
  methods['eth_gasPrice'] = await tryRequest(client, 'eth_gasPrice', []);
  methods['eth_maxPriorityFeePerGas'] = await tryRequest(
    client,
    'eth_maxPriorityFeePerGas',
    [],
  );
  methods['eth_blobBaseFee'] = await tryRequest(client, 'eth_blobBaseFee', []);
  methods['eth_feeHistory'] = await tryRequest(client, 'eth_feeHistory', [
    '0x1',
    'latest',
    [],
  ]);
  methods['eth_getBalance'] = await tryRequest(client, 'eth_getBalance', [
    zeroAddress,
  ]);
  methods['eth_getCode'] = await tryRequest(client, 'eth_getCode', [
    zeroAddress,
  ]);
  methods['eth_getStorageAt'] = await tryRequest(client, 'eth_getStorageAt', [
    zeroAddress,
    '0x0',
    'latest',
  ]);
  methods['eth_call'] = await tryRequest(client, 'eth_call', [
    { to: zeroAddress },
  ]);
  methods['eth_estimateGas'] = await tryRequest(client, 'eth_estimateGas', [
    { to: zeroAddress },
  ]);
  methods['eth_getLogs'] = await tryRequest(client, 'eth_getLogs', [
    { fromBlock: 'latest', toBlock: 'latest' },
  ]);
  methods['eth_getProof'] = await tryRequest(client, 'eth_getProof', [
    zeroAddress,
    [],
    'latest',
  ]);
  methods['eth_getTransactionCount'] = await tryRequest(
    client,
    'eth_getTransactionCount',
    [zeroAddress],
  );
  methods['eth_getBlockByNumber'] = await tryRequest(
    client,
    'eth_getBlockByNumber',
    ['latest', false],
  );
  methods['eth_getBlockByHash'] = await tryRequest(
    client,
    'eth_getBlockByHash',
    [zeroHash, false],
  );
  methods['eth_getBlockTransactionCountByNumber'] = await tryRequest(
    client,
    'eth_getBlockTransactionCountByNumber',
    ['latest'],
  );
  methods['eth_getBlockTransactionCountByHash'] = await tryRequest(
    client,
    'eth_getBlockTransactionCountByHash',
    [zeroHash],
  );
  methods['eth_getUncleCountByBlockNumber'] = await tryRequest(
    client,
    'eth_getUncleCountByBlockNumber',
    ['latest'],
  );
  methods['eth_getUncleCountByBlockHash'] = await tryRequest(
    client,
    'eth_getUncleCountByBlockHash',
    [zeroHash],
  );
  methods['eth_getTransactionByHash'] = await tryRequest(
    client,
    'eth_getTransactionByHash',
    [zeroHash],
  );
  methods['eth_getTransactionByBlockNumberAndIndex'] = await tryRequest(
    client,
    'eth_getTransactionByBlockNumberAndIndex',
    ['latest', '0x0'],
  );
  const blockHash = await getBlockHash(endpointUrl);
  methods['eth_getTransactionByBlockHashAndIndex'] = await tryRequest(
    client,
    'eth_getTransactionByBlockHashAndIndex',
    [blockHash, '0x0'],
  );
  methods['eth_getTransactionReceipt'] = await tryRequest(
    client,
    'eth_getTransactionReceipt',
    [zeroHash],
  );
  methods['eth_getUncleByBlockNumberAndIndex'] = await tryRequest(
    client,
    'eth_getUncleByBlockNumberAndIndex',
    ['latest', '0x0'],
  );
  methods['eth_getUncleByBlockHashAndIndex'] = await tryRequest(
    client,
    'eth_getUncleByBlockHashAndIndex',
    [blockHash, '0x0'],
  );
  methods['eth_syncing'] = await tryRequest(client, 'eth_syncing', []);
  methods['eth_coinbase'] = await tryRequest(client, 'eth_coinbase', []);
  methods['eth_accounts'] = await tryRequest(client, 'eth_accounts', []);
  methods['eth_mining'] = await tryRequest(client, 'eth_mining', []);
  methods['eth_hashrate'] = await tryRequest(client, 'eth_hashrate', []);
  methods['eth_getWork'] = await tryRequest(client, 'eth_getWork', []);
  methods['debug_traceCall'] = await tryRequest(client, 'debug_traceCall', [
    {
      to: zeroAddress,
    },
    'latest',
    { tracer: 'callTracer' },
  ]);
  methods['debug_traceTransaction'] = await tryRequest(
    client,
    'debug_traceTransaction',
    [zeroHash, { tracer: 'callTracer' }],
  );
  methods['debug_traceBlockByNumber'] = await tryRequest(
    client,
    'debug_traceBlockByNumber',
    ['latest', { tracer: 'callTracer' }],
  );
  methods['debug_traceBlockByHash'] = await tryRequest(
    client,
    'debug_traceBlockByHash',
    [zeroHash, { tracer: 'callTracer' }],
  );
  methods['trace_block'] = await tryRequest(client, 'trace_block', ['latest']);
  methods['trace_call'] = await tryRequest(client, 'trace_call', [
    {},
    ['trace'],
    'latest',
  ]);
  methods['trace_filter'] = await tryRequest(client, 'trace_filter', [{}]);
  methods['trace_rawTransaction'] = await tryRequest(
    client,
    'trace_rawTransaction',
    [zeroHash, ['trace']],
  );
  methods['trace_replayBlockTransactions'] = await tryRequest(
    client,
    'trace_replayBlockTransactions',
    ['latest', ['trace']],
  );
  methods['trace_replayTransaction'] = await tryRequest(
    client,
    'trace_replayTransaction',
    [zeroHash, ['trace']],
  );
  methods['trace_transaction'] = await tryRequest(client, 'trace_transaction', [
    zeroHash,
  ]);
  methods['erigon_blockNumber'] = await tryRequest(
    client,
    'erigon_blockNumber',
    [],
  );
  methods['erigon_getHeaderByNumber'] = await tryRequest(
    client,
    'erigon_getHeaderByNumber',
    ['0x0'],
  );
  methods['erigon_getHeaderByHash'] = await tryRequest(
    client,
    'erigon_getHeaderByHash',
    [blockHash],
  );
  methods['erigon_getLogsByHash'] = await tryRequest(
    client,
    'erigon_getLogsByHash',
    [blockHash],
  );
  methods['erigon_getBlockByTimestamp'] = await tryRequest(
    client,
    'erigon_getBlockByTimestamp',
    ['0', false],
  );
  methods['erigon_getLatestLogs'] = await tryRequest(
    client,
    'erigon_getLatestLogs',
    [{}, { logCount: 1 }],
  );
  methods['erigon_getBlockReceiptsByBlockHash'] = await tryRequest(
    client,
    'erigon_getBlockReceiptsByBlockHash',
    [blockHash],
  );
  return methods;
}

async function getBlockHash(endpointUrl: string): Promise<string> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  try {
    const block = await client.getBlock({
      blockTag: 'latest',
    });
    return block.hash;
  } catch (e) {
    return zeroHash;
  }
}

async function getFeatures(endpointUrl: string): Promise<Features> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  const wsClient = createPublicClient({
    transport: webSocket(endpointUrl.replace('https', 'wss')),
  });
  let websockets: Status = 'supported';
  let latestState: Status = 'supported';
  let latestEvents: Status = 'supported';
  let historicalState: Status = 'supported';
  let historicalEvents: Status = 'supported';
  try {
    const wsPromise = wsClient.getBlockNumber();
    const timeoutPromise = new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new TimeoutError('Request timed out'));
      }, 60 * 1000);
    });
    await Promise.race([wsPromise, timeoutPromise]);
  } catch (e) {
    if (e instanceof TimeoutError) {
      websockets = 'unknown';
    }
    websockets = 'unsupported';
  }
  try {
    await client.getBlockNumber();
  } catch {
    latestState = 'unsupported';
  }
  try {
    await client.getLogs({
      fromBlock: 'latest',
      toBlock: 'latest',
    });
  } catch {
    latestEvents = 'unsupported';
  }
  try {
    await client.getStorageAt({
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      slot: '0x0',
      blockNumber: 1n,
    });
  } catch {
    historicalState = 'unsupported';
  }
  try {
    await client.getLogs({
      fromBlock: 10_000_000n,
      toBlock: 10_000_000n,
    });
  } catch {
    historicalEvents = 'unsupported';
  }
  return {
    websockets,
    latestState,
    latestEvents,
    historicalState,
    historicalEvents,
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mapping: Record<
  Provider,
  Partial<
    Record<
      Chain,
      {
        features: Features | null;
        methods: Record<string, Status> | null;
        timestamp: number;
      }
    >
  >
> = {};
for (const chain of CHAINS) {
  for (const provider of PROVIDERS) {
    if (!mapping[provider]) {
      mapping[provider] = {};
    }
    console.log(`Checking ${provider} ${chain}`);
    const endpointUrl = getProviderRpcUrl(provider, chain);
    if (!endpointUrl) {
      continue;
    }
    const features = await getFeatures(endpointUrl);
    const methods = await getMethods(endpointUrl);
    mapping[provider][chain] = {
      features,
      methods,
      timestamp: Date.now(),
    };
  }
}

console.log(JSON.stringify(mapping, null, 2));
