type ParamType =
  | 'addr'
  | 'hash'
  | 'bytes32'
  | 'bytes'
  | 'int'
  | 'boolean'
  | 'block';

interface OptionalParam {
  isRequired: false;
}

interface RequiredParam {
  isRequired: true;
  default: unknown;
}

type OptionalOrRequiredParam = OptionalParam | RequiredParam;

type Param = OptionalOrRequiredParam & {
  type: ParamType;
  name: string;
};

type MethodType = 'standard';

interface Method {
  id: string;
  name: string;
  type: MethodType;
  description: string;
  params: Param[];
  formatter?: (params: unknown[]) => unknown[];
}

const SAMPLE_BLOCK_HASH =
  '0x21c3ac17a523528af506a37601fcb1c81d029f8b68dc63cd094f72767acdfd13';
const SAMPLE_TRANSACTION_HASH =
  '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9';
const SAMPLE_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const SAMPLE_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

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
        type: 'addr',
        name: 'account',
        isRequired: true,
        default: SAMPLE_ADDRESS,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
        default: 'latest',
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
        type: 'addr',
        name: 'contract',
        isRequired: true,
        default: SAMPLE_CONTRACT,
      },
      {
        type: 'int',
        name: 'slot',
        isRequired: false,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
        default: 'latest',
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
        type: 'addr',
        name: 'account',
        isRequired: true,
        default: SAMPLE_ADDRESS,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
        default: 'latest',
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
        default: SAMPLE_BLOCK_HASH,
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
        default: 'latest',
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
        default: SAMPLE_BLOCK_HASH,
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
        default: 'latest',
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
        type: 'addr',
        name: 'contract',
        isRequired: true,
        default: SAMPLE_CONTRACT,
      },
      {
        type: 'block',
        name: 'block',
        isRequired: true,
        default: 'latest',
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
        type: 'addr',
        name: 'from',
        isRequired: false,
      },
      {
        type: 'addr',
        name: 'to',
        isRequired: true,
        default: SAMPLE_CONTRACT,
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
        isRequired: true,
        default: 'latest',
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
        type: 'addr',
        name: 'from',
        isRequired: false,
      },
      {
        type: 'addr',
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
        default: SAMPLE_BLOCK_HASH,
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
        default: 'latest',
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
        default: SAMPLE_TRANSACTION_HASH,
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
        default: SAMPLE_BLOCK_HASH,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
        default: '0',
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
        default: 'latest',
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
        default: '0',
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
        default: SAMPLE_TRANSACTION_HASH,
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
        default: SAMPLE_BLOCK_HASH,
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
        default: '0',
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
        default: 'latest',
      },
      {
        type: 'int',
        name: 'index',
        isRequired: true,
        default: '0',
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
        type: 'addr',
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
      return [
        {
          fromBlock,
          toBlock,
          address: contract,
          topics: [topic0, topic1, topic2, topic3],
        },
      ];
    },
  },
];

export { Method, Param, LIST };
