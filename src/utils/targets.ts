import {
  CHAIN_ID,
  BLOCK_NUMBER,
  GAS_PRICE,
  MAX_PRIORITY_FEE_PER_GAS,
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
  MethodId,
  FEE_HISTORY,
} from './methods';

const LANGUAGE_JSON = 'json';
const LANGUAGE_JAVASCRIPT = 'javascript';
const LANGUAGE_PYTHON = 'python';
type Language =
  | typeof LANGUAGE_JSON
  | typeof LANGUAGE_JAVASCRIPT
  | typeof LANGUAGE_PYTHON;

const LIBRARY_VANILLA = 'vanilla';
const LIBRARY_ETHERS = 'ethers';
const LIBRARY_FETCH = 'fetch';
const LIBRARY_AXIOS = 'axios';
const LIBRARY_WEB3_PY = 'web3py';
const LIBRARY_REQUESTS = 'requests';
type Library =
  | typeof LIBRARY_VANILLA
  | typeof LIBRARY_ETHERS
  | typeof LIBRARY_FETCH
  | typeof LIBRARY_AXIOS
  | typeof LIBRARY_WEB3_PY
  | typeof LIBRARY_REQUESTS;

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
    case GET_BALANCE:
      return `const balance = await provider.getBalance('${params[0]}', '${params[1]}')`;
    case GET_CODE:
      return `const code = await provider.getCode('${params[0]}', '${params[1]}')`;
    case GET_STORAGE_AT:
      return `const storage = await provider.getStorageAt('${params[0]}', '${params[1]}', '${params[2]}')`;
    case CALL: {
      const formattedParams = JSON.stringify(
        {
          ...(params[0] as object),
          gas: undefined,
          gasLimit: null,
          blockTag: params[1],
        },
        null,
        2,
      ).replace(/"/g, "'");
      return `const result = await provider.call(${formattedParams})`;
    }
    case ESTIMATE_GAS: {
      const formattedParams = JSON.stringify(
        {
          ...(params[0] as object),
          gas: undefined,
          gasLimit: null,
          blockTag: params[1] === null ? undefined : params[1],
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
    case GET_TRANSACTION_COUNT: {
      return `const count = await provider.getTransactionCount('${params[0]}', '${params[1]}')`;
    }
    case GET_BLOCK_BY_HASH:
    case GET_BLOCK_BY_NUMBER: {
      return `const block = await provider.getBlock('${params[0]}', ${params[1]})`;
    }
    case GET_TRANSACTION_BY_HASH: {
      return `const transaction = await provider.getTransaction('${params[0]}')`;
    }
    case GET_TRANSACTION_RECEIPT: {
      return `const transactionReceipt = await provider.getTransactionReceipt('${params[0]}')`;
    }
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
    case GET_TRANSACTION_COUNT: {
      return `count = w3.eth.get_transaction_count('${params[0]}', '${params[1]}')`;
    }
    case GET_BLOCK_BY_HASH:
    case GET_BLOCK_BY_NUMBER: {
      return `block = w3.eth.get_block('${params[0]}', ${
        params[1] ? 'True' : 'False'
      })`;
    }
    case GET_TRANSACTION_BY_HASH: {
      return `transaction = w3.eth.get_transaction('${params[0]}')`;
    }
    case GET_TRANSACTION_RECEIPT: {
      return `transaction_receipt = w3.eth.get_transaction_receipt('${params[0]}')`;
    }
    case ACCOUNTS:
      return `accounts = w3.eth.accounts`;

    case COINBASE:
      return `coinbase = w3.eth.coinbase`;

    case SYNCING:
      return `syncing = w3.eth.syncing`;
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
  LIBRARY_FETCH,
  LIBRARY_AXIOS,
  LIBRARY_WEB3_PY,
  LIBRARY_REQUESTS,
  Language,
  Library,
  getRequest,
};
