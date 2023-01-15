import { Ref, computed } from 'vue';

import useProvider, {
  ARBITRUM,
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  Chain,
} from './useProvider';

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
  description?: string;
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

interface Defaults {
  blockHash: string;
  transactionHash: string;
  address: string;
  contract: string;
}

interface UseMethods {
  methods: Ref<Method[]>;
}

function useMethods(): UseMethods {
  const { chain } = useProvider();

  const defaults = computed(() => getDefaults(chain.value));
  const methods = computed(() => getMethodList(defaults.value));

  return {
    methods,
  };
}

function getDefaults(chain: Chain | null): Defaults {
  const blockHashMap: Record<Chain, string> = {
    [ETHEREUM]:
      '0x21c3ac17a523528af506a37601fcb1c81d029f8b68dc63cd094f72767acdfd13',
    [OPTIMISM]:
      '0xb4e8f3687f535016146f643980855510bf025454859480a931aa4a7d297c81cd',
    [POLYGON]:
      '0x4f22eb7c645467e5359eccbe5c61c5771eec30e1a47863c7b1ae337a2bef1a0c',
    [ARBITRUM]:
      '0xd2bcb0ef42123206fc713a4570bbd7fbaeb92ee04a252f5b410a5b563937e2bc',
  };
  const transactionHashMap: Record<Chain, string> = {
    [ETHEREUM]:
      '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
    [OPTIMISM]:
      '0x6c79b3fe80aa3ecf3696ec9707c91cb84d52c1029d4a5fcb7736688d423a3de6',
    [POLYGON]:
      '0x732dc072893bce74eb43784cae8650ddce4c4ce11940ec6d7ea6e681a83a1005',
    [ARBITRUM]:
      '0x732dc072893bce74eb43784cae8650ddce4c4ce11940ec6d7ea6e681a83a1005',
  };
  const defaultAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const contractMap: Record<Chain, string> = {
    [ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    [OPTIMISM]: '0x4200000000000000000000000000000000000006',
    [POLYGON]: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    [ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  };
  const definedChain = chain || ETHEREUM;

  return {
    blockHash: blockHashMap[definedChain],
    transactionHash: transactionHashMap[definedChain],
    address: defaultAddress,
    contract: contractMap[definedChain],
  };
}

function getMethodList(defaults: Defaults): Method[] {
  const { blockHash, transactionHash, address, contract } = defaults;

  return [
    {
      id: 'eth_chainId',
      name: 'Get chain ID',
      type: 'standard',
      description: 'Returns the chain ID of the current network.',
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
      id: 'eth_gasPrice',
      name: 'Get gas price',
      type: 'standard',
      description: 'Returns the current price per gas in wei.',
      params: [],
    },
    {
      id: 'eth_maxPriorityFeePerGas',
      name: 'Get maximum priority fee',
      type: 'standard',
      description: 'Returns the current maxPriorityFeePerGas per gas in wei.',
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
          default: address,
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
      id: 'eth_getCode',
      name: 'Get contract code',
      type: 'standard',
      description: 'Returns code at a given address.',
      params: [
        {
          type: 'addr',
          name: 'contract',
          isRequired: true,
          default: contract,
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
          default: contract,
        },
        {
          type: 'int',
          name: 'slot',
          isRequired: false,
          description: 'Position (index) of the memory slot',
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
          description:
            'Source of the transaction call. Useful to impersonate another account.',
        },
        {
          type: 'addr',
          name: 'to',
          isRequired: true,
          default: contract,
          description: 'Target contract',
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
          description: 'Transaction call input',
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
          description:
            'Source of the transaction call. Useful to impersonate another account.',
        },
        {
          type: 'addr',
          name: 'to',
          isRequired: false,
          description: 'Target contract',
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
          description: 'Transaction input',
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
      id: 'eth_getLogs',
      name: 'Get logs',
      type: 'standard',
      description:
        'Returns an array of all logs matching a given filter object.',
      params: [
        {
          type: 'block',
          name: 'fromBlock',
          isRequired: false,
          description: 'Start of the fetching window',
        },
        {
          type: 'block',
          name: 'toBlock',
          isRequired: false,
          description: 'End of the fetching window',
        },
        {
          type: 'addr',
          name: 'contract',
          isRequired: false,
          description:
            'Source of the logs. If blank, will fetch logs from all contracts.',
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
          default: address,
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
          description:
            'Whether to fetch the full block. If false, will only fetch the header and the list of transaction hashes.',
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
          isRequired: true,
          default: blockHash,
        },
        {
          type: 'boolean',
          name: 'isFull',
          isRequired: false,
          description:
            'Whether to fetch the full block. If false, will only fetch the header and the list of transaction hashes.',
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
          default: blockHash,
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
          default: blockHash,
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
          default: transactionHash,
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
          description: 'Transaction index',
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
          default: blockHash,
        },
        {
          type: 'int',
          name: 'index',
          isRequired: true,
          default: '0',
          description: 'Transaction index',
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
          default: transactionHash,
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
          description: 'Uncle index',
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
          default: blockHash,
        },
        {
          type: 'int',
          name: 'index',
          isRequired: true,
          default: '0',
          description: 'Uncle index',
        },
      ],
    },
  ];
}

export default useMethods;
export { Method, Param };
