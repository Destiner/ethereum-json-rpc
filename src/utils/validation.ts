import { Method, Param } from './methods';

function validate(method: Method, inputs: unknown[]): boolean[] {
  const isValid: boolean[] = [];
  for (let i = 0; i < method.params.length; i++) {
    const param = method.params[i];
    const input = inputs[i];
    isValid.push(validateParam(param, input));
  }
  return isValid;
}

function validateParam(param: Param, input: unknown): boolean {
  if (param.type === 'boolean') {
    return typeof input === 'boolean';
  }
  if (typeof input === 'string' && input === '') {
    return !param.isRequired;
  } else {
    if (param.type === 'int') {
      if (typeof input !== 'string') {
        return false;
      } else {
        const val = parseInt(input);
        return !isNaN(val) && val >= 0;
      }
    }
    if (param.type === 'address') {
      if (typeof input !== 'string') {
        return false;
      } else {
        return isAddress(input);
      }
    }
    if (param.type === 'hash') {
      if (typeof input !== 'string') {
        return false;
      } else {
        return isBytes32(input);
      }
    }
    if (param.type === 'bytes32') {
      if (typeof input !== 'string') {
        return false;
      } else {
        return isBytes32(input);
      }
    }
    if (param.type === 'bytes') {
      if (typeof input !== 'string') {
        return false;
      } else {
        return isBytes(input);
      }
    }
    if (param.type === 'block') {
      if (typeof input !== 'string') {
        return false;
      } else {
        if (input === 'latest') {
          return true;
        } else {
          const val = parseInt(input);
          return !isNaN(val) && val >= 0 && val < 1e9;
        }
      }
    }
  }
  return false;
}

function isAddress(value: string): boolean {
  const addressRegex = /^0x[0-9a-fA-F]{40}$/;
  return !!value.match(addressRegex);
}

function isBytes32(value: string): boolean {
  const hashRegex = /^0x[0-9a-f]{64}$/;
  return !!value.match(hashRegex);
}

function isBytes(value: string): boolean {
  const hashRegex = /^0x[0-9a-f]+$/;
  return !!value.match(hashRegex);
}

export default validate;
