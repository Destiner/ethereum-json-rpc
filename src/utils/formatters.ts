import { MethodType } from './methods';

function formatMethodType(type: MethodType): string {
  switch (type) {
    case 'standard':
      return 'Standard';
    case 'debug':
      return 'Debug (Geth)';
    case 'trace':
      return 'Trace (Parity)';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { formatMethodType };
