// eslint-disable-next-line import/no-extraneous-dependencies
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

import { CHAIN_IDS, ChainId } from '@/utils/chains';
import {
  CHAIN_ID,
  BLOCK_NUMBER,
  GAS_PRICE,
  MAX_PRIORITY_FEE_PER_GAS,
  BLOB_BASE_FEE,
  FEE_HISTORY,
  GET_BALANCE,
  GET_CODE,
  GET_STORAGE_AT,
  CALL,
  ESTIMATE_GAS,
  GET_LOGS,
  GET_PROOF,
  GET_TRANSACTION_COUNT,
  GET_BLOCK_BY_NUMBER,
  GET_BLOCK_BY_HASH,
  GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER,
  GET_BLOCK_TRANSACTION_COUNT_BY_HASH,
  GET_UNCLE_COUNT_BY_BLOCK_NUMBER,
  GET_UNCLE_COUNT_BY_BLOCK_HASH,
  GET_TRANSACTION_BY_HASH,
  GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX,
  GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX,
  GET_TRANSACTION_RECEIPT,
  GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
  GET_UNCLE_BY_BLOCK_HASH_AND_INDEX,
  SYNCING,
  COINBASE,
  ACCOUNTS,
  MINING,
  HASHRATE,
  GET_WORK,
  DEBUG_TRACE_CALL,
  DEBUG_TRACE_TRANSACTION,
  DEBUG_TRACE_BLOCK_BY_NUMBER,
  DEBUG_TRACE_BLOCK_BY_HASH,
  TRACE_BLOCK,
  TRACE_CALL,
  TRACE_FILTER,
  TRACE_RAW_TRANSACTION,
  TRACE_REPLAY_BLOCK_TRANSACTIONS,
  TRACE_REPLAY_TRANSACTION,
  TRACE_TRANSACTION,
  ERIGON_BLOCK_NUMBER,
  ERIGON_HEADER_BY_NUMBER,
  ERIGON_HEADER_BY_HASH,
  ERIGON_LOGS_BY_HASH,
  ERIGON_BLOCK_BY_TIMESTAMP,
  ERIGON_LATEST_LOGS,
  ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH,
  MethodId,
} from '@/utils/methods';
import {
  PROVIDERS,
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
  Provider,
} from '@/utils/providers';

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

function getProviderRpcUrl(
  provider: Provider,
  chain: ChainId,
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
  const blockHash = await getBlockHash(endpointUrl);
  const methods: Record<MethodId, unknown[]> = {
    [CHAIN_ID]: [],
    [BLOCK_NUMBER]: [],
    [GAS_PRICE]: [],
    [MAX_PRIORITY_FEE_PER_GAS]: [],
    [BLOB_BASE_FEE]: [],
    [FEE_HISTORY]: ['0x1', 'latest', []],
    [GET_BALANCE]: [zeroAddress, 'latest'],
    [GET_CODE]: [zeroAddress, 'latest'],
    [GET_STORAGE_AT]: [zeroAddress, '0x0', 'latest'],
    [CALL]: [{ to: zeroAddress }, 'latest'],
    [ESTIMATE_GAS]: [{ to: zeroAddress }],
    [GET_LOGS]: [{ fromBlock: 'latest', toBlock: 'latest' }],
    [GET_PROOF]: [zeroAddress, [], 'latest'],
    [GET_TRANSACTION_COUNT]: [zeroAddress, 'latest'],
    [GET_BLOCK_BY_NUMBER]: ['latest', false],
    [GET_BLOCK_BY_HASH]: [blockHash, false],
    [GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER]: ['latest'],
    [GET_BLOCK_TRANSACTION_COUNT_BY_HASH]: [blockHash],
    [GET_UNCLE_COUNT_BY_BLOCK_NUMBER]: ['latest'],
    [GET_UNCLE_COUNT_BY_BLOCK_HASH]: [blockHash],
    [GET_TRANSACTION_BY_HASH]: [zeroHash],
    [GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX]: ['latest', '0x0'],
    [GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX]: [blockHash, '0x0'],
    [GET_TRANSACTION_RECEIPT]: [zeroHash],
    [GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX]: ['latest', '0x0'],
    [GET_UNCLE_BY_BLOCK_HASH_AND_INDEX]: [blockHash, '0x0'],
    [SYNCING]: [],
    [COINBASE]: [],
    [ACCOUNTS]: [],
    [MINING]: [],
    [HASHRATE]: [],
    [GET_WORK]: [],
    [DEBUG_TRACE_CALL]: [
      { to: zeroAddress },
      'latest',
      { tracer: 'callTracer' },
    ],
    [DEBUG_TRACE_TRANSACTION]: [zeroHash, { tracer: 'callTracer' }],
    [DEBUG_TRACE_BLOCK_BY_NUMBER]: ['latest', { tracer: 'callTracer' }],
    [DEBUG_TRACE_BLOCK_BY_HASH]: [blockHash, { tracer: 'callTracer' }],
    [TRACE_BLOCK]: ['latest'],
    [TRACE_CALL]: [{}, ['trace'], 'latest'],
    [TRACE_FILTER]: [{}],
    [TRACE_RAW_TRANSACTION]: [zeroHash, ['trace']],
    [TRACE_REPLAY_BLOCK_TRANSACTIONS]: ['latest', ['trace']],
    [TRACE_REPLAY_TRANSACTION]: [zeroHash, ['trace']],
    [TRACE_TRANSACTION]: [zeroHash],
    [ERIGON_BLOCK_NUMBER]: [],
    [ERIGON_HEADER_BY_NUMBER]: ['0x0'],
    [ERIGON_HEADER_BY_HASH]: [blockHash],
    [ERIGON_LOGS_BY_HASH]: [blockHash],
    [ERIGON_BLOCK_BY_TIMESTAMP]: ['0', false],
    [ERIGON_LATEST_LOGS]: [{}, { logCount: 1 }],
    [ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH]: [blockHash],
  };
  const methodSupport: Record<string, Status> = {};
  for (const method in methods) {
    const params = methods[method as MethodId];
    methodSupport[method] = await tryRequest(client, method, params);
  }
  return methodSupport;
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

async function run(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mapping: Record<
    Provider,
    Partial<
      Record<
        ChainId,
        {
          features: Features | null;
          methods: Record<string, Status> | null;
          timestamp: number;
        }
      >
    >
  > = {};
  for (const chain of CHAIN_IDS) {
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
}

run();
