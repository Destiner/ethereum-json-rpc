type ParamType =
  | 'address'
  | 'hash'
  | 'bytes32'
  | 'bytes'
  | 'int'
  | 'boolean'
  | 'block';

interface Param {
  type: ParamType;
  name: string;
  isRequired: boolean;
}

type MethodType = 'standard';

interface Method {
  id: string;
  name: string;
  type: MethodType;
  description: string;
  params: Param[];
  formatter?: (params: unknown[]) => unknown[];
}

const LIST: Method[] = [
  {
    id: 'eth_gasPrice',
    name: 'Get gas price',
    type: 'standard',
    description: 'Returns the current price per gas in wei.',
    params: [],
  },
  {
    id: 'eth_blockNumber',
    name: 'Get block number',
    type: 'standard',
    description: 'Returns the number of most recent block.',
    params: [],
  },
  {
    id: 'eth_getBalance',
    name: 'Get balance',
    type: 'standard',
    description: 'Returns the current price per gas in wei.',
    params: [
      {
        type: 'address',
        name: 'account',
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getStorageAt',
    name: 'Get contract storage',
    type: 'standard',
    description:
      'Returns the value from a storage position at a given address.',
    params: [
      {
        type: 'address',
        name: 'contract',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'position',
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getTransactionCount',
    name: 'Get transaction count',
    type: 'standard',
    description: 'Returns the number of transactions sent from an address.',
    params: [
      {
        type: 'address',
        name: 'account',
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getBlockTransactionCountByHash',
    name: 'Get transaction count, by hash',
    type: 'standard',
    description:
      'Returns the number of transactions in a block from a block matching the given block hash.',
    params: [
      {
        type: 'hash',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getBlockTransactionCountByNumber',
    name: 'Get transaction count, by number',
    type: 'standard',
    description:
      'Returns the number of transactions in a block matching the given block number.',
    params: [
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getUncleCountByBlockHash',
    name: 'Get uncle count, by hash',
    type: 'standard',
    description:
      'Returns the number of uncles in a block from a block matching the given block hash.',
    params: [
      {
        type: 'hash',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getUncleCountByBlockNumber',
    name: 'Get uncle count, by number',
    type: 'standard',
    description:
      'Returns the number of uncles in a block from a block matching the given block number.',
    params: [
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getCode',
    name: 'Get contract code',
    type: 'standard',
    description: 'Returns code at a given address.',
    params: [
      {
        type: 'address',
        name: 'contract',
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_call',
    name: 'Call',
    type: 'standard',
    description:
      'Executes a new message call immediately without creating a transaction on the block chain.',
    params: [
      {
        type: 'address',
        name: 'from',
        isRequired: false,
      },
      {
        type: 'address',
        name: 'to',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'gas',
        isRequired: false,
      },
      {
        type: 'int',
        name: 'gasPrice',
        isRequired: false,
      },
      {
        type: 'int',
        name: 'value',
        isRequired: false,
      },
      {
        type: 'bytes',
        name: 'data',
        isRequired: false,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: false,
      },
    ],
    formatter: (params): unknown[] => {
      const call = {
        from: params[0],
        to: params[1],
        gas: params[2],
        gasPrice: params[3],
        value: params[4],
        data: params[5],
      };
      const block = params[6];
      return [call, block];
    },
  },
  {
    id: 'eth_estimateGas',
    name: 'Estimate gas',
    type: 'standard',
    description:
      'Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.',
    params: [
      {
        type: 'address',
        name: 'from',
        isRequired: false,
      },
      {
        type: 'address',
        name: 'to',
        isRequired: false,
      },
      {
        type: 'int',
        name: 'gas',
        isRequired: false,
      },
      {
        type: 'int',
        name: 'gasPrice',
        isRequired: false,
      },
      {
        type: 'int',
        name: 'value',
        isRequired: false,
      },
      {
        type: 'bytes',
        name: 'data',
        isRequired: false,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: false,
      },
    ],
    formatter: (params): unknown[] => {
      const call = {
        from: params[0],
        to: params[1],
        gas: params[2],
        gasPrice: params[3],
        value: params[4],
        data: params[5],
      };
      const block = params[6];
      return [call, block];
    },
  },
  {
    id: 'eth_getBlockByHash',
    name: 'Get block, by hash',
    type: 'standard',
    description: 'Returns information about a block by hash.',
    params: [
      {
        type: 'hash',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'boolean',
        name: 'isFull',
        isRequired: false,
      },
    ],
  },
  {
    id: 'eth_getBlockByNumber',
    name: 'Get block, by number',
    type: 'standard',
    description: 'Returns information about a block by block number.',
    params: [
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'boolean',
        name: 'isFull',
        isRequired: false,
      },
    ],
  },
  {
    id: 'eth_getTransactionByHash',
    name: 'Get transaction, by number',
    type: 'standard',
    description:
      'Returns the information about a transaction requested by transaction hash.',
    params: [
      {
        type: 'hash',
        name: 'transaction',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getTransactionByBlockHashAndIndex',
    name: 'Get transaction, by block hash and index',
    type: 'standard',
    description:
      'Returns information about a transaction by block hash and transaction index position.',
    params: [
      {
        type: 'hash',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getTransactionByBlockNumberAndIndex',
    name: 'Get transaction, by block number and index',
    type: 'standard',
    description:
      'Returns information about a transaction by block number and transaction index position.',
    params: [
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getTransactionReceipt',
    name: 'Get transaction receipt',
    type: 'standard',
    description: 'Returns the receipt of a transaction by transaction hash.',
    params: [
      {
        type: 'hash',
        name: 'transaction',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getUncleByBlockHashAndIndex',
    name: 'Get uncle, by block hash and index',
    type: 'standard',
    description:
      'Returns information about a uncle of a block by hash and uncle index position.',
    params: [
      {
        type: 'hash',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getUncleByBlockNumberAndIndex',
    name: 'Get uncle, by block number and index',
    type: 'standard',
    description:
      'Returns information about a uncle of a block by number and uncle index position.',
    params: [
      {
        type: 'block',
        name: 'block',
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
      },
    ],
  },
  {
    id: 'eth_getLogs',
    name: 'Get logs',
    type: 'standard',
    description: 'Returns an array of all logs matching a given filter object.',
    params: [
      {
        type: 'block',
        name: 'fromBlock',
        isRequired: false,
      },
      {
        type: 'block',
        name: 'toBlock',
        isRequired: false,
      },
      {
        type: 'address',
        name: 'contract',
        isRequired: false,
      },
      {
        type: 'bytes32',
        name: 'topic0',
        isRequired: false,
      },
      {
        type: 'bytes32',
        name: 'topic1',
        isRequired: false,
      },
      {
        type: 'bytes32',
        name: 'topic2',
        isRequired: false,
      },
      {
        type: 'bytes32',
        name: 'topic3',
        isRequired: false,
      },
    ],
    formatter: (params): unknown[] => {
      const fromBlock = params[0];
      const toBlock = params[1];
      const contract = params[2];
      const topic0 = params[3];
      const topic1 = params[4];
      const topic2 = params[5];
      const topic3 = params[6];
      return [fromBlock, toBlock, contract, [topic0, topic1, topic2, topic3]];
    },
  },
];

export { Method, Param, LIST };
