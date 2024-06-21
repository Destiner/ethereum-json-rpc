import { zeroHash } from 'viem';
import { Ref, computed } from 'vue';

import { ARBITRUM, BASE, ETHEREUM, OPTIMISM, POLYGON } from '@/utils/chains';
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
  ACCOUNTS,
  COINBASE,
  SYNCING,
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
  Method,
} from '@/utils/methods';

import useChain, { ReferenceChain } from './useChain';

interface Defaults {
  blockHash: string;
  transactionHash: string;
  transactionInput: string;
  address: string;
  contract: string;
}

interface UseMethods {
  methods: Ref<Method[]>;
}

function useMethods(): UseMethods {
  const { chain } = useChain();

  const defaults = computed(() => getDefaults(chain.value));
  const methods = computed(() => getMethodList(defaults.value));

  return {
    methods,
  };
}

function getDefaults(chain: ReferenceChain | null): Defaults {
  const blockHashMap: Record<ReferenceChain, string> = {
    [ETHEREUM]:
      '0x21c3ac17a523528af506a37601fcb1c81d029f8b68dc63cd094f72767acdfd13',
    [OPTIMISM]:
      '0xb4e8f3687f535016146f643980855510bf025454859480a931aa4a7d297c81cd',
    [BASE]:
      '0x2a45c95d4f6d22dba9f9ab0e869dd100c67a0478e07eac522ad3f1ef35ad9943',
    [POLYGON]:
      '0x4f22eb7c645467e5359eccbe5c61c5771eec30e1a47863c7b1ae337a2bef1a0c',
    [ARBITRUM]:
      '0xd2bcb0ef42123206fc713a4570bbd7fbaeb92ee04a252f5b410a5b563937e2bc',
  };
  const transactionHashMap: Record<ReferenceChain, string> = {
    [ETHEREUM]:
      '0x05f71e1b2cb4f03e547739db15d080fd30c989eda04d37ce6264c5686e0722c9',
    [OPTIMISM]:
      '0x6c79b3fe80aa3ecf3696ec9707c91cb84d52c1029d4a5fcb7736688d423a3de6',
    [BASE]:
      '0xb0146c90f7894e4f1d631d2256405fc44e1bd9b60fd6b194433dbd99096e0a9d',
    [POLYGON]:
      '0x732dc072893bce74eb43784cae8650ddce4c4ce11940ec6d7ea6e681a83a1005',
    [ARBITRUM]:
      '0x732dc072893bce74eb43784cae8650ddce4c4ce11940ec6d7ea6e681a83a1005',
  };
  const defaultTransactionInput =
    '0x02f8740181948459682f0085275c2c9f8b82520894885885521990b53fd00556c143ea056dd2f62a128808cc0c47d9477f9080c080a037437ba52140dbac1d7dc65cdb58531e038930c82314817f91cb8d8ea36a2bd0a001e134479d567b8595d77f61106cad34e62ed356d6971bc08fe0363a0696dd94';
  const defaultAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const contractMap: Record<ReferenceChain, string> = {
    [ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    [OPTIMISM]: '0x4200000000000000000000000000000000000006',
    [BASE]: '0x4200000000000000000000000000000000000006',
    [POLYGON]: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    [ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  };
  const definedChain = chain || ETHEREUM;

  return {
    blockHash: blockHashMap[definedChain],
    transactionHash: transactionHashMap[definedChain],
    transactionInput: defaultTransactionInput,
    address: defaultAddress,
    contract: contractMap[definedChain],
  };
}

function getMethodList(defaults: Defaults): Method[] {
  const { blockHash, transactionHash, transactionInput, address, contract } =
    defaults;

  return [
    {
      id: CHAIN_ID,
      name: 'Get chain ID',
      type: 'reading',
      description: 'Returns the chain ID of the current network.',
      params: [],
    },
    {
      id: BLOCK_NUMBER,
      name: 'Get block number',
      type: 'reading',
      description: 'Returns the number of most recent block.',
      params: [],
    },
    {
      id: GAS_PRICE,
      name: 'Get gas price',
      type: 'reading',
      description: 'Returns the current price per gas in wei.',
      params: [],
    },
    {
      id: MAX_PRIORITY_FEE_PER_GAS,
      name: 'Get maximum priority fee',
      type: 'reading',
      description: 'Returns the current maxPriorityFeePerGas per gas in wei.',
      params: [],
    },
    {
      id: BLOB_BASE_FEE,
      name: 'Get blob base fee',
      type: 'reading',
      description: 'Returns the base fee per blob gas in wei.',
      params: [],
    },
    {
      id: FEE_HISTORY,
      name: 'Transaction fee history',
      type: 'reading',
      description:
        'Returns transaction base fee per gas and effective priority fee per gas for the requested/supported block range.',
      params: [
        {
          type: 'int',
          name: 'block count',
          isRequired: true,
          default: '1',
          description:
            'Requested range of blocks. Clients will return less than the requested range if not all blocks are available.',
        },
        {
          type: 'block',
          name: 'newest block',
          isRequired: true,
          default: 'latest',
          description: 'Highest block of the requested range.',
        },
        {
          type: 'array',
          itemType: 'int',
          name: 'reward percentiles',
          description:
            'A monotonically increasing list of percentile values. For each block in the requested range, the transactions will be sorted in ascending order by effective tip per gas and the coresponding effective tip for the percentile will be determined, accounting for gas consumed.',
        },
      ],
      formatter: (params): unknown[] => {
        const blockCount = params[0];
        const newestBlock = params[1];
        const rewardPercentiles = params[2] as (string | null)[];
        const formattedRewardPercentiles = rewardPercentiles
          .filter((percentile) => percentile !== null)
          .map((percentile) => parseInt(percentile));
        formattedRewardPercentiles.sort((a, b) => a - b);
        return [blockCount, newestBlock, formattedRewardPercentiles];
      },
    },
    {
      id: GET_BALANCE,
      name: 'Get balance',
      type: 'reading',
      description: 'Returns the current price per gas in wei.',
      params: [
        {
          type: 'add​ress',
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
      id: GET_CODE,
      name: 'Get contract code',
      type: 'reading',
      description: 'Returns code at a given address.',
      params: [
        {
          type: 'add​ress',
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
      id: GET_STORAGE_AT,
      name: 'Get contract storage',
      type: 'reading',
      description:
        'Returns the value from a storage position at a given address.',
      params: [
        {
          type: 'add​ress',
          name: 'contract',
          isRequired: true,
          default: contract,
        },
        {
          type: 'bytes32',
          name: 'slot',
          isRequired: true,
          default: zeroHash,
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
      id: CALL,
      name: 'Call',
      type: 'reading',
      description:
        'Executes a new message call immediately without creating a transaction on the block chain.',
      params: [
        {
          type: 'object',
          name: 'transaction',
          items: {
            nonce: {
              type: 'int',
              name: 'nonce',
              isRequired: false,
            },
            type: {
              type: 'int',
              name: 'type',
              isRequired: false,
              description: 'Transaction type',
            },
            from: {
              type: 'add​ress',
              name: 'from',
              isRequired: false,
              description:
                'Source of the transaction call. Useful to impersonate another account.',
            },
            to: {
              type: 'add​ress',
              name: 'to',
              isRequired: true,
              default: contract,
              description: 'Target contract',
            },
            gas: {
              type: 'int',
              name: 'gas',
              isRequired: false,
              description: 'Gas limit',
            },
            value: {
              type: 'int',
              name: 'value',
              isRequired: false,
            },
            data: {
              type: 'bytes',
              name: 'data',
              isRequired: false,
              description: 'Transaction call input',
            },
            gasPrice: {
              type: 'int',
              name: 'gas price',
              isRequired: false,
              description:
                'The gas price willing to be paid by the sender in wei',
            },
            maxFeePerGas: {
              type: 'int',
              name: 'max fee per gas',
              isRequired: false,
              description:
                'The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei',
            },
            maxPriorityFeePerGas: {
              type: 'int',
              name: 'max priority fee per gas',
              isRequired: false,
              description:
                'Maximum fee per gas the sender is willing to pay to miners in wei',
            },
            maxFeePerBlobGas: {
              type: 'int',
              name: 'max fee per blob gas',
              isRequired: false,
              description:
                'The maximum total fee per gas the sender is willing to pay for blob gas in wei',
            },
          },
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
      id: ESTIMATE_GAS,
      name: 'Estimate gas',
      type: 'reading',
      description:
        'Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.',
      params: [
        {
          type: 'object',
          name: 'transaction',
          items: {
            from: {
              type: 'add​ress',
              name: 'from',
              isRequired: false,
              description:
                'Source of the transaction call. Useful to impersonate another account.',
            },
            to: {
              type: 'add​ress',
              name: 'to',
              isRequired: false,
              description: 'Target contract',
            },
            gas: {
              type: 'int',
              name: 'gas',
              isRequired: false,
            },
            gasPrice: {
              type: 'int',
              name: 'gas price',
              isRequired: false,
            },
            value: {
              type: 'int',
              name: 'value',
              isRequired: false,
            },
            data: {
              type: 'bytes',
              name: 'data',
              isRequired: false,
              description: 'Transaction input',
            },
            maxFeePerGas: {
              type: 'int',
              name: 'max fee per gas',
              isRequired: false,
            },
            maxPriorityFeePerGas: {
              type: 'int',
              name: 'max priority fee per gas',
              isRequired: false,
            },
            nonce: {
              type: 'int',
              name: 'nonce',
              isRequired: false,
            },
            type: {
              type: 'int',
              name: 'type',
              isRequired: false,
              description: 'Transaction type',
            },
          },
        },
        {
          type: 'block',
          name: 'block',
          isRequired: false,
        },
      ],
    },
    {
      id: GET_LOGS,
      name: 'Get logs',
      type: 'reading',
      description:
        'Returns an array of all logs matching a given filter object.',
      params: [
        {
          type: 'object',
          name: 'filter',
          items: {
            fromBlock: {
              type: 'block',
              name: 'from block',
              isRequired: false,
              description: 'Start of the fetching window',
            },
            toBlock: {
              type: 'block',
              name: 'to block',
              isRequired: false,
              description: 'End of the fetching window',
            },
            address: {
              type: 'add​ress',
              name: 'contract',
              isRequired: false,
              description:
                'Source of the logs. If blank, will fetch logs from all contracts.',
            },
            topics: {
              type: 'array',
              itemType: 'bytes32',
              name: 'topics',
              count: 4,
            },
          },
        },
      ],
    },
    {
      id: GET_PROOF,
      name: 'Get proof',
      type: 'reading',
      description:
        'Returns the merkle proof for a given account and optionally some storage keys.',
      params: [
        {
          type: 'add​ress',
          name: 'account',
          isRequired: true,
          default: address,
        },
        {
          type: 'array',
          itemType: 'bytes32',
          name: 'storage keys',
        },
        {
          type: 'block',
          name: 'block',
          isRequired: true,
          default: 'latest',
        },
      ],
      formatter: (params): unknown[] => {
        const account = params[0];
        const storageKeys = params[1] as (string | null)[];
        const block = params[2];

        const formattedStorageKeys = storageKeys.filter((key) => key !== null);
        return [account, formattedStorageKeys, block];
      },
    },
    {
      id: GET_TRANSACTION_COUNT,
      name: 'Get transaction count',
      type: 'reading',
      description: 'Returns the number of transactions sent from an address.',
      params: [
        {
          type: 'add​ress',
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
      id: GET_BLOCK_BY_NUMBER,
      name: 'Get block, by number',
      type: 'reading',
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
          name: 'is full',
          isRequired: false,
          description:
            'Whether to fetch the full block. If false, will only fetch the header and the list of transaction hashes.',
        },
      ],
    },
    {
      id: GET_BLOCK_BY_HASH,
      name: 'Get block, by hash',
      type: 'reading',
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
          name: 'is full',
          isRequired: false,
          description:
            'Whether to fetch the full block. If false, will only fetch the header and the list of transaction hashes.',
        },
      ],
    },
    {
      id: GET_BLOCK_TRANSACTION_COUNT_BY_NUMBER,
      name: 'Get transaction count, by number',
      type: 'reading',
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
      id: GET_BLOCK_TRANSACTION_COUNT_BY_HASH,
      name: 'Get transaction count, by hash',
      type: 'reading',
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
      id: GET_UNCLE_COUNT_BY_BLOCK_NUMBER,
      name: 'Get uncle count, by number',
      type: 'reading',
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
      id: GET_UNCLE_COUNT_BY_BLOCK_HASH,
      name: 'Get uncle count, by hash',
      type: 'reading',
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
      id: GET_TRANSACTION_BY_HASH,
      name: 'Get transaction, by number',
      type: 'reading',
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
      id: GET_TRANSACTION_BY_BLOCK_NUMBER_AND_INDEX,
      name: 'Get transaction, by block number and index',
      type: 'reading',
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
      id: GET_TRANSACTION_BY_BLOCK_HASH_AND_INDEX,
      name: 'Get transaction, by block hash and index',
      type: 'reading',
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
      id: GET_TRANSACTION_RECEIPT,
      name: 'Get transaction receipt',
      type: 'reading',
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
      id: GET_UNCLE_BY_BLOCK_NUMBER_AND_INDEX,
      name: 'Get uncle, by block number and index',
      type: 'reading',
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
      id: GET_UNCLE_BY_BLOCK_HASH_AND_INDEX,
      name: 'Get uncle, by block hash and index',
      type: 'reading',
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
    {
      id: ACCOUNTS,
      name: 'Accounts',
      type: 'reading',
      description: 'Returns a list of addresses owned by client.',
      params: [],
    },
    {
      id: COINBASE,
      name: 'Coinbase',
      type: 'reading',
      description: 'Returns the client coinbase address.',
      params: [],
    },
    {
      id: SYNCING,
      name: 'Syncing status',
      type: 'reading',
      description:
        'Returns an object with data about the sync status or false.',
      params: [],
    },
    {
      id: MINING,
      name: 'Mining status',
      type: 'reading',
      description: 'Returns whether the client is actively mining new blocks.',
      params: [],
    },
    {
      id: HASHRATE,
      name: 'Hashrate',
      type: 'reading',
      description:
        'Returns the number of hashes per second that the node is mining with.',
      params: [],
    },
    {
      id: GET_WORK,
      name: 'Get work',
      type: 'reading',
      description:
        'Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").',
      params: [],
    },
    {
      id: DEBUG_TRACE_CALL,
      name: 'Trace call',
      type: 'debug',
      description:
        'Runs an eth_call within the context of the given block execution using the final state of parent block as the base.',
      params: [
        {
          type: 'object',
          name: 'transaction',
          items: {
            from: {
              type: 'add​ress',
              name: 'from',
              isRequired: false,
              description:
                'Source of the transaction call. Useful to impersonate another account.',
            },
            to: {
              type: 'add​ress',
              name: 'to',
              isRequired: true,
              default: contract,
              description: 'Target contract',
            },
            gas: {
              type: 'int',
              name: 'gas',
              isRequired: false,
            },
            gasPrice: {
              type: 'int',
              name: 'gas price',
              isRequired: false,
            },
            value: {
              type: 'int',
              name: 'value',
              isRequired: false,
            },
            data: {
              type: 'bytes',
              name: 'data',
              isRequired: false,
              description: 'Transaction call input',
            },
          },
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
      id: DEBUG_TRACE_TRANSACTION,
      name: 'Trace transaction',
      type: 'debug',
      description:
        'Attempts to run the transaction in the exact same manner as it was executed on the network. It will replay any transaction that may have been executed prior to this one before it and will then attempt to execute the transaction that corresponds to the given hash.',
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
      id: DEBUG_TRACE_BLOCK_BY_NUMBER,
      name: 'Trace block, by number',
      type: 'debug',
      description: 'Replays the block that is already present in the database.',
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
      id: DEBUG_TRACE_BLOCK_BY_HASH,
      name: 'Trace block, by hash',
      type: 'debug',
      description: 'Replays the block that is already present in the database.',
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
      id: TRACE_BLOCK,
      name: 'Trace block, by number',
      type: 'trace',
      description: 'Replays the block that is already present in the database.',
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
      id: TRACE_CALL,
      name: 'Trace call',
      type: 'trace',
      description: 'Simulates the call',
      params: [
        {
          type: 'object',
          name: 'block',
          items: {
            from: {
              type: 'add​ress',
              name: 'from',
              isRequired: false,
              description:
                'Source of the transaction call. Useful to impersonate another account.',
            },
            to: {
              type: 'add​ress',
              name: 'to',
              isRequired: false,
              description: 'Target contract',
            },
            gas: {
              type: 'int',
              name: 'gas',
              isRequired: false,
            },
            gasPrice: {
              type: 'int',
              name: 'gas price',
              isRequired: false,
            },
            value: {
              type: 'int',
              name: 'value',
              isRequired: false,
            },
            data: {
              type: 'bytes',
              name: 'data',
              isRequired: false,
              description: 'Transaction input',
            },
          },
        },
        {
          type: 'array',
          itemType: 'trace',
          name: 'type',
          description:
            'Or or more trace types: "vmTrace" to get a full trace of virtual machine\'s state during the execution of the given of given transaction, including for any subcalls, "trace" to get the basic trace of the given transaction, "statediff" to get information on altered Ethereum state due to execution of the given transaction.',
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
      id: TRACE_FILTER,
      name: 'Trace filtered transactions',
      type: 'trace',
      description:
        'Simulates the block transactions, filtered by "from" or "to" addresses',
      params: [
        {
          type: 'object',
          name: 'filter',
          items: {
            fromBlock: {
              type: 'block',
              name: 'from block',
              isRequired: false,
            },
            toBlock: {
              type: 'block',
              name: 'to block',
              isRequired: false,
            },
            fromaddress: {
              type: 'array',
              name: 'from addresses',
              itemType: 'add​ress',
              description: 'Sender address list',
            },
            toaddress: {
              type: 'add​ress',
              name: 'to add​ress',
              isRequired: false,
              description: 'Receiver add​ress',
            },
            after: {
              type: 'int',
              name: 'after',
              isRequired: false,
              description: 'Trace array offset',
            },
            count: {
              type: 'int',
              name: 'count',
              isRequired: false,
              description: 'Number of traces to display in a batch.',
            },
          },
        },
      ],
    },
    {
      id: TRACE_RAW_TRANSACTION,
      name: 'Trace raw transaction',
      type: 'trace',
      description: 'Simulates the transaction based on the raw data',
      params: [
        {
          type: 'bytes',
          name: 'data',
          isRequired: true,
          default: transactionInput,
        },
        {
          type: 'array',
          itemType: 'trace',
          name: 'type',
          description:
            'Or or more trace types: "vmTrace" to get a full trace of virtual machine\'s state during the execution of the given of given transaction, including for any subcalls, "trace" to get the basic trace of the given transaction, "statediff" to get information on altered Ethereum state due to execution of the given transaction.',
        },
      ],
    },
    {
      id: TRACE_REPLAY_BLOCK_TRANSACTIONS,
      name: 'Replay block transactions',
      type: 'trace',
      description: 'Replays the block transactions',
      params: [
        {
          type: 'block',
          name: 'block',
          isRequired: true,
          default: 'latest',
        },
        {
          type: 'array',
          itemType: 'trace',
          name: 'type',
          description:
            'Or or more trace types: "vmTrace" to get a full trace of virtual machine\'s state during the execution of the given of given transaction, including for any subcalls, "trace" to get the basic trace of the given transaction, "statediff" to get information on altered Ethereum state due to execution of the given transaction.',
        },
      ],
    },
    {
      id: TRACE_REPLAY_TRANSACTION,
      name: 'Replay transaction',
      type: 'trace',
      description: 'Replays a single transaction',
      params: [
        {
          type: 'hash',
          name: 'hash',
          isRequired: true,
          default: transactionHash,
        },
        {
          type: 'array',
          itemType: 'trace',
          name: 'type',
          description:
            'Or or more trace types: "vmTrace" to get a full trace of virtual machine\'s state during the execution of the given of given transaction, including for any subcalls, "trace" to get the basic trace of the given transaction, "statediff" to get information on altered Ethereum state due to execution of the given transaction.',
        },
      ],
    },
    {
      id: TRACE_TRANSACTION,
      name: 'Trace transaction',
      type: 'trace',
      description: 'Simulates a single transaction',
      params: [
        {
          type: 'hash',
          name: 'hash',
          isRequired: true,
          default: transactionHash,
        },
      ],
    },
    {
      id: ERIGON_BLOCK_NUMBER,
      name: 'Erigon: get block number',
      type: 'erigon',
      description: 'Returns the latest executed block number.',
      params: [],
    },
    {
      id: ERIGON_HEADER_BY_NUMBER,
      name: 'Erigon: get block header, by number',
      type: 'erigon',
      description:
        "Given a block number, returns the block's header. May be faster if the block's transaction and uncle list is ignored.",
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
      id: ERIGON_HEADER_BY_HASH,
      name: 'Erigon: get block header, by hash',
      type: 'erigon',
      description:
        "Given a block hash, returns the block's header. May be faster if the block's transaction and uncle list is ignored.",
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
      id: ERIGON_LOGS_BY_HASH,
      name: 'Erigon: get logs by block hash',
      type: 'erigon',
      description:
        "Returns an array of arrays of logs produced by the block's transactions.",
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
      id: ERIGON_BLOCK_BY_TIMESTAMP,
      name: 'Erigon: get block by timestamp',
      type: 'erigon',
      description: 'Returns the block with the given timestamp.',
      params: [
        {
          type: 'int',
          name: 'timestamp',
          isRequired: true,
          default: '0',
          description: 'Block timestamp',
        },
        {
          type: 'boolean',
          name: 'is full',
          isRequired: false,
          description:
            'Whether to fetch the full block. If false, will only fetch the header and the list of transaction hashes.',
        },
      ],
    },
    {
      id: ERIGON_LATEST_LOGS,
      name: 'Erigon: get latest logs',
      type: 'erigon',
      description: 'Returns the latest logs for a given filtering criteria.',
      params: [
        {
          type: 'object',
          name: 'filter',
          items: {
            address: {
              type: 'add​ress',
              name: 'address',
              isRequired: false,
            },
            topics: {
              type: 'array',
              name: 'topics',
              itemType: 'bytes32',
            },
            fromBlock: {
              type: 'block',
              name: 'from block',
              isRequired: false,
              description: 'Starting block number',
            },
            toBlock: {
              type: 'block',
              name: 'to add​ress',
              isRequired: false,
              description: 'Ending block number',
            },
          },
        },
        {
          type: 'object',
          name: 'options',
          items: {
            logCount: {
              type: 'int',
              name: 'log count',
              isRequired: false,
              description: 'Number of logs to return',
            },
            blockCount: {
              type: 'int',
              name: 'block count',
              isRequired: false,
              description: 'Number of blocks to search for logs',
            },
            ignoreTopicsOrder: {
              type: 'boolean',
              name: 'ignore topics order',
              isRequired: false,
              description: 'Ignore the order of topics',
            },
          },
        },
      ],
    },
    {
      id: ERIGON_BLOCK_RECEIPTS_BY_BLOCK_HASH,
      name: 'Erigon: get receipts by block hash',
      type: 'erigon',
      description: 'Returns the receipts of a block by block hash.',
      params: [
        {
          type: 'hash',
          name: 'block',
          isRequired: true,
          default: blockHash,
        },
      ],
    },
  ];
}

export default useMethods;
