import 'dotenv/config';
import {
  alchemy,
  ankr,
  // blast,
  // chainstack,
  cloudflare,
  drpc,
  // gatewayFm,
  infura,
  // llamaNodes,
  oneRpc,
  publicNode,
  // quicknode,
  // stackup,
  // tenderly,
} from 'evm-providers';
import { PublicClient, createPublicClient, http, webSocket, zeroAddress, zeroHash } from 'viem';
import {
  mainnet,
  optimism,
  polygon,
  arbitrum,
} from 'viem/chains';

const alchemyApiKey = process.env.ALCHEMY_KEY as string;
const infuraApiKey = process.env.INFURA_KEY as string;

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
const OP_MAINNET = optimism.id;
const POLYGON = polygon.id;
const ARBITRUM = arbitrum.id;

type Chain = 
  | typeof ETHEREUM
  | typeof OP_MAINNET
  | typeof POLYGON
  | typeof ARBITRUM;

const CHAINS: Chain[] = [ETHEREUM, OP_MAINNET, POLYGON, ARBITRUM];

const ALCHEMY = 'alchemy'
const ANKR = 'ankr'
const BLAST = 'blast'
const CHAINSTACK = 'chainstack'
const CLOUDFLARE = 'cloudflare'
const DRPC = 'drpc'
const GATEWAY_FM = 'gatewayFm'
const INFURA = 'infura'
const LLAMA_NODES = 'llamaNodes'
const ONE_RPC = 'oneRpc'
const PUBLIC_NODE = 'publicNode'
const QUICK_NODE = 'quicknode'
const STACKUP = 'stackup'
const TENDERLY = 'tenderly';

type Provider = 
  | typeof ALCHEMY
  | typeof ANKR
  | typeof BLAST
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
    CLOUDFLARE,
    DRPC,
    // INFURA,
    // ONE_RPC,
    // PUBLIC_NODE,
  ];

function getProviderRpcUrl(provider: Provider, chain: Chain): string {
  switch (provider) {
    case ALCHEMY:
      return alchemy(chain, alchemyApiKey);
    case ANKR:
      return ankr(chain);
    // case BLAST:
    //   return blast(chain);
    // case CHAINSTACK:
    //   return chainstack(chain);
    case CLOUDFLARE:
      return cloudflare(chain as typeof ETHEREUM);
    case DRPC:
      return drpc(chain);
    // case GATEWAY_FM:
    //   return gatewayFm(chain);
    case INFURA:
      return infura(chain, infuraApiKey);
    // case LLAMA_NODES:
    //   return llamaNodes(chain);
    case ONE_RPC:
      return oneRpc(chain);
    case PUBLIC_NODE:
      return publicNode(chain);
    // case QUICK_NODE:
    //   return quicknode(chain);
    // case STACKUP:
    //   return stackup();
    // case TENDERLY:
    //   return tenderly(chain);
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
  } catch(e) {
    if (e instanceof TimeoutError) {
      return 'unknown';
    }
    // console.log(e.details)
    return 'unsupported';
  }
  return 'supported';
}

async function getMethods(endpointUrl: string): Promise<Record<string, Status>> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  const methods: Record<string, Status> = {};
  // eth_chainId
  methods['eth_chainId'] = await tryRequest(client, 'eth_chainId', []);
  // eth_blockNumber
  methods['eth_blockNumber'] = await tryRequest(client, 'eth_blockNumber', []);
  // eth_gasPrice
  methods['eth_gasPrice'] = await tryRequest(client, 'eth_gasPrice', []);
  // eth_maxPriorityFeePerGas
  methods['eth_maxPriorityFeePerGas'] = await tryRequest(client, 'eth_maxPriorityFeePerGas', []);
  // eth_blobBaseFee
  methods['eth_blobBaseFee'] = await tryRequest(client, 'eth_blobBaseFee', []);
  // eth_feeHistory
  methods['eth_feeHistory'] = await tryRequest(client, 'eth_feeHistory', [
    "0x1",
    "latest",
    []
  ]);
  // eth_getBalance
  methods['eth_getBalance'] = await tryRequest(client, 'eth_getBalance', [zeroAddress]);
  // eth_getCode
  methods['eth_getCode'] = await tryRequest(client, 'eth_getCode', [zeroAddress]);
  // eth_getStorageAt
  methods['eth_getStorageAt'] = await tryRequest(client, 'eth_getStorageAt', [zeroAddress, '0x0', 'latest']);
  // eth_call
  methods['eth_call'] = await tryRequest(client, 'eth_call', [{ to: zeroAddress }]);
  // eth_estimateGas
  methods['eth_estimateGas'] = await tryRequest(client, 'eth_estimateGas', [{ to: zeroAddress }]);
  // eth_getLogs
  methods['eth_getLogs'] = await tryRequest(client, 'eth_getLogs', [{ fromBlock: 'latest', toBlock: 'latest' }]);
  // eth_getProof
  methods['eth_getProof'] = await tryRequest(client, 'eth_getProof', [zeroAddress, [], 'latest']);
  // eth_getTransactionCount
  methods['eth_getTransactionCount'] = await tryRequest(client, 'eth_getTransactionCount', [zeroAddress]);
  // eth_getBlockByNumber
  methods['eth_getBlockByNumber'] = await tryRequest(client, 'eth_getBlockByNumber', ['latest', false]);
  // eth_getBlockByHash
  methods['eth_getBlockByHash'] = await tryRequest(client, 'eth_getBlockByHash', [zeroHash, false]);
  // eth_getBlockTransactionCountByNumber
  methods['eth_getBlockTransactionCountByNumber'] = await tryRequest(client, 'eth_getBlockTransactionCountByNumber', ['latest']);
  // eth_getBlockTransactionCountByHash
  methods['eth_getBlockTransactionCountByHash'] = await tryRequest(client, 'eth_getBlockTransactionCountByHash', [zeroHash]);
  // eth_getUncleCountByBlockNumber
  methods['eth_getUncleCountByBlockNumber'] = await tryRequest(client, 'eth_getUncleCountByBlockNumber', ['latest']);
  // eth_getUncleCountByBlockHash
  methods['eth_getUncleCountByBlockHash'] = await tryRequest(client, 'eth_getUncleCountByBlockHash', [zeroHash]);
  // eth_getTransactionByHash
  methods['eth_getTransactionByHash'] = await tryRequest(client, 'eth_getTransactionByHash', [zeroHash]);
  // eth_getTransactionByBlockNumberAndIndex
  methods['eth_getTransactionByBlockNumberAndIndex'] = await tryRequest(client, 'eth_getTransactionByBlockNumberAndIndex', ['latest', '0x0']);
  // eth_getTransactionByBlockHashAndIndex
  const blockHash = await getBlockHash(endpointUrl);
  methods['eth_getTransactionByBlockHashAndIndex'] = await tryRequest(client, 'eth_getTransactionByBlockHashAndIndex', [blockHash, '0x0']);
  // eth_getTransactionReceipt
  methods['eth_getTransactionReceipt'] = await tryRequest(client, 'eth_getTransactionReceipt', [zeroHash]);
  // eth_getUncleByBlockNumberAndIndex
  methods['eth_getUncleByBlockNumberAndIndex'] = await tryRequest(client, 'eth_getUncleByBlockNumberAndIndex', ['latest', '0x0']);
  // eth_getUncleByBlockHashAndIndex
  methods['eth_getUncleByBlockHashAndIndex'] = await tryRequest(client, 'eth_getUncleByBlockHashAndIndex', [blockHash, '0x0']);
  // eth_syncing
  methods['eth_syncing'] = await tryRequest(client, 'eth_syncing', []);
  // eth_coinbase
  methods['eth_coinbase'] = await tryRequest(client, 'eth_coinbase', []);
  // eth_accounts
  methods['eth_accounts'] = await tryRequest(client, 'eth_accounts', []);
  // eth_mining
  methods['eth_mining'] = await tryRequest(client, 'eth_mining', []);
  // eth_hashrate
  methods['eth_hashrate'] = await tryRequest(client, 'eth_hashrate', []);
  // eth_getWork
  methods['eth_getWork'] = await tryRequest(client, 'eth_getWork', []);
  // debug_traceCall
  methods['debug_traceCall'] = await tryRequest(client, 'debug_traceCall', [{
    to: zeroAddress,
  }, 'latest', {tracer: 'callTracer'}]);
  // debug_traceTransaction
  methods['debug_traceTransaction'] = await tryRequest(client, 'debug_traceTransaction', [zeroHash, {tracer: 'callTracer'}]);
  // debug_traceBlockByNumber
  methods['debug_traceBlockByNumber'] = await tryRequest(client, 'debug_traceBlockByNumber', ['latest', {tracer: 'callTracer'}]);
  // debug_traceBlockByHash
  methods['debug_traceBlockByHash'] = await tryRequest(client, 'debug_traceBlockByHash', [zeroHash, {tracer: 'callTracer'}]);
  // trace_block
  methods['trace_block'] = await tryRequest(client, 'trace_block', ['latest']);
  // trace_call
  methods['trace_call'] = await tryRequest(client, 'trace_call', [{}, ['trace'], 'latest']);
  // trace_filter
  methods['trace_filter'] = await tryRequest(client, 'trace_filter', [{}]);
  // trace_rawTransaction
  methods['trace_rawTransaction'] = await tryRequest(client, 'trace_rawTransaction', [zeroHash, ['trace']]);
  // trace_replayBlockTransactions
  methods['trace_replayBlockTransactions'] = await tryRequest(client, 'trace_replayBlockTransactions', ['latest', ['trace']]);
  // trace_replayTransaction
  methods['trace_replayTransaction'] = await tryRequest(client, 'trace_replayTransaction', [zeroHash, ['trace']]);
  // trace_transaction
  methods['trace_transaction'] = await tryRequest(client, 'trace_transaction', [zeroHash]);
  // erigon_blockNumber
  methods['erigon_blockNumber'] = await tryRequest(client, 'erigon_blockNumber', []);
  // erigon_getHeaderByNumber
  methods['erigon_getHeaderByNumber'] = await tryRequest(client, 'erigon_getHeaderByNumber', ['0x0']);
  // erigon_getHeaderByHash
  methods['erigon_getHeaderByHash'] = await tryRequest(client, 'erigon_getHeaderByHash', [blockHash]);
  // erigon_getLogsByHash
  methods['erigon_getLogsByHash'] = await tryRequest(client, 'erigon_getLogsByHash', [blockHash]);
  // erigon_getBlockByTimestamp
  methods['erigon_getBlockByTimestamp'] = await tryRequest(client, 'erigon_getBlockByTimestamp', ['0', false]);
  // erigon_getLatestLogs
  methods['erigon_getLatestLogs'] = await tryRequest(client, 'erigon_getLatestLogs', [{}, {logCount: 1}]);
  // erigon_getBlockReceiptsByBlockHash
  methods['erigon_getBlockReceiptsByBlockHash'] = await tryRequest(client, 'erigon_getBlockReceiptsByBlockHash', [blockHash]);
  return methods;
}

async function getBlockHash(endpointUrl: string): Promise<string> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  const block = await client.getBlock({
    blockTag: 'latest',
  });
  return block.hash;
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
  } catch(e) {
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
  // try {
  //   await makeRequest(client, 'debug_traceCall', [
  //     {
  //       to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //     },
  //   ]);
  // } catch {
  //   debugMethods.traceCall = false;
  // }
  // try {
  //   await makeRequest(client, 'debug_traceTransaction', [
  //     '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
  //   ]);
  // } catch {
  //   debugMethods.traceTransaction = false;
  // }
  // try {
  //   await makeRequest(client, 'debug_traceBlockByNumber', ['latest']);
  // } catch {
  //   debugMethods.traceBlock = false;
  // }
  // // Trace methods
  // try {
  //   await makeRequest(client, 'trace_block', ['latest']);
  // } catch {
  //   traceMethods.block = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_call', [{}, {}, 'latest']);
  // } catch {
  //   traceMethods.call = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_filter', [{}]);
  // } catch {
  //   traceMethods.filter = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_rawTransaction', [
  //     '0x02f8740181948459682f0085275c2c9f8b82520894885885521990b53fd00556c143ea056dd2f62a128808cc0c47d9477f9080c080a037437ba52140dbac1d7dc65cdb58531e038930c82314817f91cb8d8ea36a2bd0a001e134479d567b8595d77f61106cad34e62ed356d6971bc08fe0363a0696dd94',
  //   ]);
  // } catch {
  //   traceMethods.rawTransaction = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_replayBlockTransactions', ['latest']);
  // } catch {
  //   traceMethods.replayBlockTransactions = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_replayTransaction', [
  //     '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
  //   ]);
  // } catch {
  //   traceMethods.replayTransaction = false;
  // }
  // try {
  //   await makeRequest(client, 'trace_transaction', [
  //     '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
  //   ]);
  // } catch {
  //   traceMethods.transaction = false;
  // }
  // // Erigon methods
  // try {
  //   await makeRequest(client, 'erigon_getHeaderByHash', [
  //     '0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6',
  //   ]);
  // } catch {
  //   erigonMethods.getHeaderByHash = false;
  // }
  // try {
  //   await makeRequest(client, 'erigon_getBlockReceiptsByBlockHash', [
  //     '0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6',
  //   ]);
  // } catch {
  //   erigonMethods.getBlockReceiptsByBlockHash = false;
  // }
  // try {
  //   await makeRequest(client, 'erigon_getHeaderByNumber', ['latest']);
  // } catch {
  //   erigonMethods.getHeaderByNumber = false;
  // }
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
const mapping: Record<Provider, Record<Chain, {
  features: Features | null;
  methods: Record<string, Status> | null;
  timestamp: number;
}>> = {};
for (const provider of PROVIDERS) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mapping[provider] = {};
  for (const chain of CHAINS) {
    const endpointUrl = getProviderRpcUrl(provider, chain);
    if (!endpointUrl) {
      mapping[provider][chain] = {
        features: null,
        methods: null,
        timestamp: Date.now(),
      };
      continue;
    }
    const features = await getFeatures(endpointUrl);
    const methods = await getMethods(endpointUrl)
    mapping[provider][chain] = {
      features,
      methods,
      timestamp: Date.now(),
    };
  }
}

console.log(JSON.stringify(mapping, null, 2));
