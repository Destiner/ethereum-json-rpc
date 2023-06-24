import 'dotenv/config';
import { PublicClient, createPublicClient, http, webSocket } from 'viem';

import erc20Abi from './abi/erc20.json' assert { type: 'json' };

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

const endponits: string[] = process.env.ENDPOINTS?.split(',') ?? [];

async function makeRequest(
  client: PublicClient,
  method: string,
  params: unknown[],
): Promise<void> {
  await client.request({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    method,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    params,
  });
}

async function getFeatures(endpointUrl: string): Promise<Features> {
  const client = createPublicClient({
    transport: http(endpointUrl),
  });
  const wsClient = createPublicClient({
    transport: webSocket(endpointUrl.replace('https', 'wss')),
  });
  let websockets = true;
  let latestState = true;
  let latestEvents = true;
  let historicalState = true;
  let historicalEvents = true;
  const debugMethods = {
    traceCall: true,
    traceTransaction: true,
    traceBlock: true,
  };
  const traceMethods = {
    block: true,
    call: true,
    filter: true,
    rawTransaction: true,
    replayBlockTransactions: true,
    replayTransaction: true,
    transaction: true,
  };
  const erigonMethods = {
    getHeaderByHash: true,
    getBlockReceiptsByBlockHash: true,
    getHeaderByNumber: true,
  };
  try {
    await wsClient.getBlockNumber();
  } catch {
    websockets = false;
  }
  try {
    await client.getBlockNumber();
  } catch {
    latestState = false;
  }
  try {
    await client.getLogs({
      fromBlock: 'latest',
      toBlock: 'latest',
    });
  } catch {
    latestEvents = false;
  }
  try {
    await client.readContract({
      abi: erc20Abi,
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      functionName: 'balanceOf',
      args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
      blockNumber: 10_000_000n,
    });
  } catch {
    historicalState = false;
  }
  try {
    await client.getLogs({
      fromBlock: 10_000_000n,
      toBlock: 10_000_000n,
    });
  } catch {
    historicalEvents = false;
  }
  // Debug methods
  try {
    await makeRequest(client, 'debug_traceCall', [
      {
        to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);
  } catch {
    debugMethods.traceCall = false;
  }
  try {
    await makeRequest(client, 'debug_traceTransaction', [
      '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
    ]);
  } catch {
    debugMethods.traceTransaction = false;
  }
  try {
    await makeRequest(client, 'debug_traceBlockByNumber', ['latest']);
  } catch {
    debugMethods.traceBlock = false;
  }
  // Trace methods
  try {
    await makeRequest(client, 'trace_block', ['latest']);
  } catch {
    traceMethods.block = false;
  }
  try {
    await makeRequest(client, 'trace_call', [{}, {}, 'latest']);
  } catch {
    traceMethods.call = false;
  }
  try {
    await makeRequest(client, 'trace_filter', [{}]);
  } catch {
    traceMethods.filter = false;
  }
  try {
    await makeRequest(client, 'trace_rawTransaction', [
      '0x02f8740181948459682f0085275c2c9f8b82520894885885521990b53fd00556c143ea056dd2f62a128808cc0c47d9477f9080c080a037437ba52140dbac1d7dc65cdb58531e038930c82314817f91cb8d8ea36a2bd0a001e134479d567b8595d77f61106cad34e62ed356d6971bc08fe0363a0696dd94',
    ]);
  } catch {
    traceMethods.rawTransaction = false;
  }
  try {
    await makeRequest(client, 'trace_replayBlockTransactions', ['latest']);
  } catch {
    traceMethods.replayBlockTransactions = false;
  }
  try {
    await makeRequest(client, 'trace_replayTransaction', [
      '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
    ]);
  } catch {
    traceMethods.replayTransaction = false;
  }
  try {
    await makeRequest(client, 'trace_transaction', [
      '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
    ]);
  } catch {
    traceMethods.transaction = false;
  }
  // Erigon methods
  try {
    await makeRequest(client, 'erigon_getHeaderByHash', [
      '0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6',
    ]);
  } catch {
    erigonMethods.getHeaderByHash = false;
  }
  try {
    await makeRequest(client, 'erigon_getBlockReceiptsByBlockHash', [
      '0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6',
    ]);
  } catch {
    erigonMethods.getBlockReceiptsByBlockHash = false;
  }
  try {
    await makeRequest(client, 'erigon_getHeaderByNumber', ['latest']);
  } catch {
    erigonMethods.getHeaderByNumber = false;
  }
  return {
    websockets,
    latestState,
    latestEvents,
    historicalState,
    historicalEvents,
    debugMethods,
    traceMethods,
    erigonMethods,
  };
}

for (const endponint of endponits) {
  const features = await getFeatures(endponint);
  console.log(endponint, features);
}
