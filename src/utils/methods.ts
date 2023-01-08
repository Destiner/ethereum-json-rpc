type ParamType = 'address' | 'int' | 'block';

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
        isRequired: false,
      },
    ],
  },
];

export { Method, LIST };
