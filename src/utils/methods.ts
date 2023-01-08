type ParamType =
  | 'address'
  | 'hash'
  | 'bytes32'
  | 'bytes'
  | 'int'
  | 'boolean'
  | 'block';

interface SimpleParam {
  type: ParamType;
  name: string;
  isArray: boolean;
  isRequired: boolean;
}

interface TupleParam {
  type: 'tuple';
  name: string;
  isArray: boolean;
  isRequired: boolean;
  params: Param[];
}

type Param = SimpleParam | TupleParam;

type MethodType = 'standard';

interface Method {
  id: string;
  name: string;
  type: MethodType;
  description: string;
  params: Param[];
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'int',
        name: 'position',
        isArray: false,
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
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
        isArray: false,
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
        isArray: false,
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
        isArray: false,
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
        isArray: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
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
        type: 'tuple',
        name: 'contract',
        isArray: false,
        isRequired: true,
        params: [
          {
            type: 'address',
            name: 'from',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'address',
            name: 'to',
            isArray: false,
            isRequired: true,
          },
          {
            type: 'int',
            name: 'gas',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'gasPrice',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'value',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'bytes',
            name: 'data',
            isArray: false,
            isRequired: false,
          },
        ],
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
      },
    ],
  },
  {
    id: 'eth_estimateGas',
    name: 'Estimate gas',
    type: 'standard',
    description:
      'Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.',
    params: [
      {
        type: 'tuple',
        name: 'contract',
        isArray: false,
        isRequired: true,
        params: [
          {
            type: 'address',
            name: 'from',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'address',
            name: 'to',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'gas',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'gasPrice',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'value',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'bytes',
            name: 'data',
            isArray: false,
            isRequired: false,
          },
        ],
      },
      {
        type: 'block',
        name: 'block',
        isArray: false,
        isRequired: false,
      },
    ],
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'boolean',
        name: 'isFull',
        isArray: false,
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
        type: 'hash',
        name: 'block',
        isArray: false,
        isRequired: true,
      },
      {
        type: 'boolean',
        name: 'isFull',
        isArray: false,
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
        isArray: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isArray: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isArray: false,
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
        isArray: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isArray: false,
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
        isArray: false,
        isRequired: true,
      },
      {
        type: 'int',
        name: 'index',
        isArray: false,
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
        type: 'tuple',
        name: 'filter',
        isArray: false,
        isRequired: true,
        params: [
          {
            type: 'block',
            name: 'fromBlock',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'block',
            name: 'toBlock',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'address',
            name: 'contract',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'bytes32',
            name: 'topics',
            isArray: true,
            isRequired: false,
          },
          {
            type: 'int',
            name: 'value',
            isArray: false,
            isRequired: false,
          },
          {
            type: 'bytes',
            name: 'data',
            isArray: false,
            isRequired: false,
          },
        ],
      },
    ],
  },
];

export { Method, LIST };
