import {
  CHAIN_ID,
  BLOCK_NUMBER,
  GAS_PRICE,
  MAX_PRIORITY_FEE_PER_GAS,
  BLOB_BASE_FEE,
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
  ACCOUNTS,
  COINBASE,
  SYNCING,
  MINING,
  HASHRATE,
  GET_WORK,
  FEE_HISTORY,
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
} from './methods';
import { isBlockNumber, isBlockTag } from './validation';

const LANGUAGE_JSON = 'json';
const LANGUAGE_JAVASCRIPT = 'javascript';
const LANGUAGE_PYTHON = 'python';
type Language =
  | typeof LANGUAGE_JSON
  | typeof LANGUAGE_JAVASCRIPT
  | typeof LANGUAGE_PYTHON;

const LIBRARY_VANILLA = 'vanilla';
const LIBRARY_ETHERS = 'ethers';
const LIBRARY_VIEM = 'viem';
const LIBRARY_FETCH = 'fetch';
const LIBRARY_AXIOS = 'axios';
const LIBRARY_WEB3_PY = 'web3py';
const LIBRARY_REQUESTS = 'requests';
type Library =
  | typeof LIBRARY_VANILLA
  | typeof LIBRARY_ETHERS
  | typeof LIBRARY_VIEM
  | typeof LIBRARY_FETCH
  | typeof LIBRARY_AXIOS
  | typeof LIBRARY_WEB3_PY
  | typeof LIBRARY_REQUESTS;

interface Call {
  from?: string;
  gas?: string;
  nonce?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

interface LogFilter {
  fromBlock: string | null;
  toBlock: string | null;
  address: string | null;
  topics: (string | null)[];
}

function getRequest(
  language: Language,
  library: Library,
  method: MethodId,
  params: unknown[],
): string {
  switch (language) {
    case LANGUAGE_JSON:
      return getJsonRequest(method, params);
    case LANGUAGE_JAVASCRIPT:
      return getJavascriptRequest(library, method, params);
    case LANGUAGE_PYTHON:
      return getPythonRequest(library, method, params);
  }
}

function getJsonRequest(method: MethodId, params: unknown[]): string {
  const request = {
    jsonrpc: '2.0',
    method,
    params,
  };
  return JSON.stringify(request, null, 4);
}

function getJavascriptRequest(
  library: Library,
  method: MethodId,
  params: unknown[],
): string {
  switch (library) {
    case LIBRARY_ETHERS:
      return getJavascriptEthersRequest(method, params);
    case LIBRARY_VIEM:
      return getJavascriptViemRequest(method, params);
    case LIBRARY_FETCH:
      return getJavascriptBrowserRequest(method, params);
    case LIBRARY_AXIOS:
      return getJavascriptNodeRequest(method, params);
    default:
      return '';
  }
}

function getJavascriptEthersRequest(
  method: MethodId,
  params: unknown[],
): string {
  switch (method) {
    case CHAIN_ID:
      return `const network = await provider.getNetwork()
const chainId = network.chainId`;
    case BLOCK_NUMBER:
      return `const block = await provider.getBlockNumber()`;
    case GAS_PRICE:
      return `const gasPrice = await provider.getGasPrice()`;
    case MAX_PRIORITY_FEE_PER_GAS:
      return `const feeData = await provider.getFeeData()
const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas`;
    case BLOB_BASE_FEE:
      return '';
    case GET_BALANCE:
      return `const balance = await provider.getBalance('${params[0]}', '${params[1]}')`;
    case GET_CODE:
      return `const code = await provider.getCode('${params[0]}', '${params[1]}')`;
    case GET_STORAGE_AT:
      return `const storage = await provider.getStorageAt('${params[0]}', '${params[1]}', '${params[2]}')`;
    case CALL: {
      const nonce = (params[0] as Call).nonce;
      const formattedParams = JSON.stringify(
        {
          ...(params[0] as object),
          gas: undefined,
          gasLimit: null,
          blockTag: params[1],
          nonce: nonce ? parseInt(nonce) : undefined,
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const result = await provider.call(${formattedParams})`;
    }
    case ESTIMATE_GAS: {
      const nonce = (params[0] as Call).nonce;
      const formattedParams = JSON.stringify(
        {
          ...(params[0] as object),
          gas: undefined,
          gasLimit: null,
          blockTag: params[1] === null ? undefined : params[1],
          nonce: nonce ? parseInt(nonce) : undefined,
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const gas = await provider.estimateGas(${formattedParams})`;
    }
    case GET_LOGS: {
      const filter = params[0] as LogFilter;
      const formattedParams = JSON.stringify(
        {
          ...filter,
          fromBlock: filter.fromBlock === null ? undefined : filter.fromBlock,
          toBlock: filter.toBlock === null ? undefined : filter.toBlock,
          address: filter.address === null ? undefined : filter.address,
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const logs = await provider.getLogs(${formattedParams})`;
    }
    case GET_TRANSACTION_COUNT:
      return `const count = await provider.getTransactionCount('${params[0]}', '${params[1]}')`;
    case GET_BLOCK_BY_HASH:
    case GET_BLOCK_BY_NUMBER:
      return `const block = await provider.getBlock('${params[0]}', ${params[1]})`;
    case GET_TRANSACTION_BY_HASH:
      return `const transaction = await provider.getTransaction('${params[0]}')`;
    case GET_TRANSACTION_RECEIPT:
      return `const transactionReceipt = await provider.getTransactionReceipt('${params[0]}')`;
    case FEE_HISTORY:
    case GET_PROOF:
    case GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER:
    case GET_BLOCK_TRANSACTION_COUNT_BY_HASH:
    case GET_UNCLE_COUNT_BY_BLOCK_NUMBER:
    case GET_UNCLE_COUNT_BY_BLOCK_HASH:
    case GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX:
    case GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX:
    case GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX:
    case GET_UNCLE_BY_BLOCK_HASH_AND_INDEX:
    case ACCOUNTS:
    case COINBASE:
    case SYNCING:
    case MINING:
    case HASHRATE:
    case GET_WORK:
    case DEBUG_TRACE_CALL:
    case DEBUG_TRACE_TRANSACTION:
    case DEBUG_TRACE_BLOCK_BY_NUMBER:
    case DEBUG_TRACE_BLOCK_BY_HASH:
    case TRACE_BLOCK:
    case TRACE_CALL:
    case TRACE_FILTER:
    case TRACE_RAW_TRANSACTION:
    case TRACE_REPLAY_BLOCK_TRANSACTIONS:
    case TRACE_REPLAY_TRANSACTION:
    case TRACE_TRANSACTION:
    case ERIGON_BLOCK_NUMBER:
    case ERIGON_HEADER_BY_NUMBER:
    case ERIGON_HEADER_BY_HASH:
    case ERIGON_LOGS_BY_HASH:
    case ERIGON_BLOCK_BY_TIMESTAMP:
    case ERIGON_LATEST_LOGS:
    case ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH:
      return '';
  }
}

function getJavascriptViemRequest(method: MethodId, params: unknown[]): string {
  function getBlock(blockParam: string | null): {
    blockTag?: string;
    blockNumber?: number;
  } {
    return {
      blockTag:
        blockParam === null
          ? undefined
          : isBlockTag(blockParam as string)
            ? (blockParam as string)
            : undefined,
      blockNumber:
        blockParam === null
          ? undefined
          : isBlockNumber(blockParam as string)
            ? parseInt(blockParam as string)
            : undefined,
    };
  }
  switch (method) {
    case CHAIN_ID:
      return `const block = await publicClient.getChainId()`;
    case BLOCK_NUMBER:
      return `const block = await publicClient.getBlockNumber()`;
    case GAS_PRICE:
      return `const gasPrice = await publicClient.getGasPrice()`;
    case MAX_PRIORITY_FEE_PER_GAS:
      return `const maxPriorityFeePerGas = await publicClient.estimateMaxPriorityFeePerGas()`;
    case BLOB_BASE_FEE:
      return `const baseFee = await publicClient.getBlobBaseFee()`;
    case FEE_HISTORY: {
      const formattedParams = JSON.stringify(
        {
          blockCount: params[0],
          ...getBlock(params[1] as string | null),
          rewardPercentiles: params[2],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const transaction = await publicClient.getFeeHistory(${formattedParams})`;
    }
    case GET_BALANCE: {
      const formattedParams = JSON.stringify(
        {
          address: params[0],
          ...getBlock(params[1] as string | null),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const balance = await publicClient.getBalance(${formattedParams})`;
    }
    case GET_CODE: {
      const formattedParams = JSON.stringify(
        {
          address: params[0],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getBytecode(${formattedParams})`;
    }
    case GET_STORAGE_AT: {
      const formattedParams = JSON.stringify(
        {
          address: params[0],
          slot: params[1],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const data = await publicClient.getStorageAt(${formattedParams})`;
    }
    case CALL: {
      const from = (params[0] as Call).from;
      const gasPrice = (params[0] as Call).gasPrice;
      const maxFeePerGas = (params[0] as Call).maxFeePerGas;
      const maxPriorityFeePerGas = (params[0] as Call).maxPriorityFeePerGas;
      const nonce = (params[0] as Call).nonce;

      const formattedParams = JSON.stringify(
        {
          account: from ? from : undefined,
          ...(params[0] as object),
          from: undefined,
          gas: undefined,
          ...getBlock(params[1] as string | null),
          nonce: nonce ? parseInt(nonce) : undefined,
          gasPrice: gasPrice ? parseInt(gasPrice) : undefined,
          maxFeePerGas: maxFeePerGas ? parseInt(maxFeePerGas) : undefined,
          maxPriorityFeePerGas: maxPriorityFeePerGas
            ? parseInt(maxPriorityFeePerGas)
            : undefined,
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const data = await publicClient.call(${formattedParams})`;
    }
    case ESTIMATE_GAS: {
      const from = (params[0] as Call).from;
      const gasPrice = (params[0] as Call).gasPrice;
      const maxFeePerGas = (params[0] as Call).maxFeePerGas;
      const maxPriorityFeePerGas = (params[0] as Call).maxPriorityFeePerGas;
      const nonce = (params[0] as Call).nonce;

      const formattedParams = JSON.stringify(
        {
          account: from ? from : undefined,
          ...(params[0] as object),
          from: undefined,
          gas: undefined,
          ...getBlock(params[1] as string | null),
          nonce: nonce ? parseInt(nonce) : undefined,
          gasPrice: gasPrice ? parseInt(gasPrice) : undefined,
          maxFeePerGas: maxFeePerGas ? parseInt(maxFeePerGas) : undefined,
          maxPriorityFeePerGas: maxPriorityFeePerGas
            ? parseInt(maxPriorityFeePerGas)
            : undefined,
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const gasEstimate = await publicClient.estimateGas(${formattedParams})`;
    }
    case GET_TRANSACTION_COUNT: {
      const formattedParams = JSON.stringify(
        {
          address: params[0],
          ...getBlock(params[1] as string | null),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getTransactionCount(${formattedParams})`;
    }
    case GET_BLOCK_BY_NUMBER: {
      const formattedParams = JSON.stringify(
        {
          ...getBlock(params[0] as string | null),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getBlock(${formattedParams})`;
    }
    case GET_BLOCK_BY_HASH: {
      const formattedParams = JSON.stringify(
        {
          blockHash: params[0],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getBlock(${formattedParams})`;
    }
    case GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER: {
      const formattedParams = JSON.stringify(
        {
          ...getBlock(params[0] as string | null),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getBlockTransactionCount(${formattedParams})`;
    }
    case GET_BLOCK_TRANSACTION_COUNT_BY_HASH: {
      const formattedParams = JSON.stringify(
        {
          blockHash: params[0],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getBlockTransactionCount(${formattedParams})`;
    }
    case GET_TRANSACTION_BY_HASH: {
      const formattedParams = JSON.stringify(
        {
          hash: params[0],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const transaction = await publicClient.getTransaction(${formattedParams})`;
    }
    case GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX: {
      const formattedParams = JSON.stringify(
        {
          ...getBlock(params[0] as string | null),
          index: parseInt(params[1] as string),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getTransaction(${formattedParams})`;
    }
    case GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX: {
      const formattedParams = JSON.stringify(
        {
          blockHash: params[0],
          index: parseInt(params[1] as string),
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const code = await publicClient.getTransaction(${formattedParams})`;
    }
    case GET_TRANSACTION_RECEIPT: {
      const formattedParams = JSON.stringify(
        {
          hash: params[0],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const transaction = await publicClient.getTransactionReceipt(${formattedParams})`;
    }
    case ACCOUNTS: {
      return `const code = await walletClient.getAddresses()`;
    }
    case GET_LOGS:
    case GET_PROOF:
    case GET_UNCLE_COUNT_BY_BLOCK_NUMBER:
    case GET_UNCLE_COUNT_BY_BLOCK_HASH:
    case GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX:
    case GET_UNCLE_BY_BLOCK_HASH_AND_INDEX:
    case COINBASE:
    case SYNCING:
    case MINING:
    case HASHRATE:
    case GET_WORK:
    case DEBUG_TRACE_CALL:
    case DEBUG_TRACE_TRANSACTION:
    case DEBUG_TRACE_BLOCK_BY_NUMBER:
    case DEBUG_TRACE_BLOCK_BY_HASH:
    case TRACE_BLOCK:
    case TRACE_CALL:
    case TRACE_FILTER:
    case TRACE_RAW_TRANSACTION:
    case TRACE_REPLAY_BLOCK_TRANSACTIONS:
    case TRACE_REPLAY_TRANSACTION:
    case TRACE_TRANSACTION:
    case ERIGON_BLOCK_NUMBER:
    case ERIGON_HEADER_BY_NUMBER:
    case ERIGON_HEADER_BY_HASH:
    case ERIGON_LOGS_BY_HASH:
    case ERIGON_BLOCK_BY_TIMESTAMP:
    case ERIGON_LATEST_LOGS:
    case ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH:
      return '';
  }
}

function getJavascriptBrowserRequest(
  method: MethodId,
  params: unknown[],
): string {
  const formattedParams = JSON.stringify(params, null, 2)
    .replace(/"/g, "'")
    // eslint-disable-next-line no-useless-escape
    .replace(/^[^\[\]]/gm, '     ')
    .replace(/^\]/gm, '    ]');
  return `const response = await fetch(providerEndpoint, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'jsonrpc': '2.0',
    'method': '${method}',
    'params': ${formattedParams},
  })
})`;
}

function getJavascriptNodeRequest(method: MethodId, params: unknown[]): string {
  const formattedParams = JSON.stringify(params, null, 2)
    .replace(/"/g, "'")
    // eslint-disable-next-line no-useless-escape
    .replace(/^[^\[\]]/gm, '     ')
    .replace(/^\]/gm, '    ]');
  return `const response = await axios({
  method: 'POST',
  url: providerEndpoint,
  headers: {
    'Content-Type': 'application/json',
  },
  data: JSON.stringify({
    jsonrpc: '2.0',
    method: '${method}',
    params: ${formattedParams},
  }),
});`;
}

function getPythonRequest(
  library: Library,
  method: MethodId,
  params: unknown[],
): string {
  switch (library) {
    case LIBRARY_WEB3_PY:
      return getPythonWeb3Request(method, params);
    case LIBRARY_REQUESTS:
      return getPythonRequestsRequest(method, params);
    default:
      return '';
  }
}

function getPythonWeb3Request(method: MethodId, params: unknown[]): string {
  switch (method) {
    case CHAIN_ID:
      return `chain_id = w3.eth.chain_id`;
    case BLOCK_NUMBER:
      return `block = w3.eth.block_number`;
    case GAS_PRICE:
      return `gas_price = w3.eth.gas_price`;
    case MAX_PRIORITY_FEE_PER_GAS:
      return `max_priority_fee = w3.eth.max_priority_fee`;
    case BLOB_BASE_FEE:
      return '';
    case GET_BALANCE:
      return `balance = w3.eth.get_balance('${params[0]}', '${params[1]}')`;
    case GET_CODE:
      return `code = w3.eth.get_code('${params[0]}', '${params[1]}')`;
    case GET_STORAGE_AT:
      return `storage = w3.eth.get_storage_at('${params[0]}', '${params[1]}')`;
    case CALL: {
      const formattedParams = JSON.stringify(
        Object.fromEntries(
          Object.entries(params[0] as object).filter(
            ([, value]) => value !== null,
          ),
        ),
        null,
        4,
      ).replace(/"/g, "'");
      return `result = w3.eth.call(${formattedParams}, '${params[1]}')`;
    }
    case ESTIMATE_GAS: {
      const formattedParams = JSON.stringify(
        Object.fromEntries(
          Object.entries(params[0] as object).filter(
            ([, value]) => value !== null,
          ),
        ),
        null,
        4,
      ).replace(/"/g, "'");
      return `result = w3.eth.estimate_gas(${formattedParams}${
        params[1] ? `, '${params[1]}'` : ''
      })`;
    }
    case GET_LOGS: {
      // TODO
      return '';
    }
    case GET_TRANSACTION_COUNT:
      return `count = w3.eth.get_transaction_count('${params[0]}', '${params[1]}')`;
    case GET_BLOCK_BY_HASH:
    case GET_BLOCK_BY_NUMBER:
      return `block = w3.eth.get_block('${params[0]}', ${
        params[1] ? 'True' : 'False'
      })`;
    case GET_TRANSACTION_BY_HASH:
      return `transaction = w3.eth.get_transaction('${params[0]}')`;
    case GET_TRANSACTION_RECEIPT:
      return `transaction_receipt = w3.eth.get_transaction_receipt('${params[0]}')`;
    case ACCOUNTS:
      return `accounts = w3.eth.accounts`;
    case COINBASE:
      return `coinbase = w3.eth.coinbase`;
    case SYNCING:
      return `syncing = w3.eth.syncing`;
    case MINING:
      return `mining = w3.eth.mining`;
    case HASHRATE:
      return `hashrate = w3.eth.hashrate`;
    case FEE_HISTORY:
    case GET_PROOF:
    case GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER:
    case GET_BLOCK_TRANSACTION_COUNT_BY_HASH:
    case GET_UNCLE_COUNT_BY_BLOCK_NUMBER:
    case GET_UNCLE_COUNT_BY_BLOCK_HASH:
    case GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX:
    case GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX:
    case GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX:
    case GET_UNCLE_BY_BLOCK_HASH_AND_INDEX:
    case GET_WORK:
    case DEBUG_TRACE_CALL:
    case DEBUG_TRACE_TRANSACTION:
    case DEBUG_TRACE_BLOCK_BY_NUMBER:
    case DEBUG_TRACE_BLOCK_BY_HASH:
    case TRACE_BLOCK:
    case TRACE_CALL:
    case TRACE_FILTER:
    case TRACE_RAW_TRANSACTION:
    case TRACE_REPLAY_BLOCK_TRANSACTIONS:
    case TRACE_REPLAY_TRANSACTION:
    case TRACE_TRANSACTION:
    case ERIGON_BLOCK_NUMBER:
    case ERIGON_HEADER_BY_NUMBER:
    case ERIGON_HEADER_BY_HASH:
    case ERIGON_LOGS_BY_HASH:
    case ERIGON_BLOCK_BY_TIMESTAMP:
    case ERIGON_LATEST_LOGS:
    case ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH:
      return '';
  }
}

function getPythonRequestsRequest(method: MethodId, params: unknown[]): string {
  const formattedParams = JSON.stringify(params, null, 4)
    .replace(/"/g, "'")
    // eslint-disable-next-line no-useless-escape
    .replace(/^[^\[\]]/gm, '         ')
    .replace(/^\]/gm, '        ]');
  switch (method) {
    case GET_BLOCK_BY_HASH:
    case GET_BLOCK_BY_NUMBER: {
      return `response = requests.post(
    url=provider_endpoint,
    data=json.dumps({
        'jsonrpc': '2.0',
        'method': '${method}',
        'params': [
            '${params[0]}',
            ${params[1] ? 'True' : 'False'},
        ],
    })
)`;
    }
    default:
      return `response = requests.post(
    url=provider_endpoint,
    data=json.dumps({
        'jsonrpc': '2.0',
        'method': '${method}',
        'params': ${formattedParams},
    })
)`;
  }
}

export {
  LANGUAGE_JSON,
  LANGUAGE_JAVASCRIPT,
  LANGUAGE_PYTHON,
  LIBRARY_VANILLA,
  LIBRARY_ETHERS,
  LIBRARY_VIEM,
  LIBRARY_FETCH,
  LIBRARY_AXIOS,
  LIBRARY_WEB3_PY,
  LIBRARY_REQUESTS,
  getRequest,
};
export type { Language, Library };
