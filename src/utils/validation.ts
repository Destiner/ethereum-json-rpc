import { Method } from './methods';

function validate(method: Method, inputs: unknown[]): boolean[] {
  const isValid: boolean[] = [];
  for (let i = 0; i < method.params.length; i++) {
    const param = method.params[i];
    const input = inputs[i];
    if (param.type === 'boolean') {
      isValid.push(typeof input === 'boolean');
    }
    if (param.type === 'int') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        const val = parseInt(input);
        isValid.push(!isNaN(val) && val >= 0);
      }
    }
    if (param.type === 'address') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        isValid.push(isAddress(input));
      }
    }
    if (param.type === 'hash') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        isValid.push(isBytes32(input));
      }
    }
    if (param.type === 'bytes32') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        isValid.push(isBytes32(input));
      }
    }
    if (param.type === 'bytes') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        isValid.push(isBytes(input));
      }
    }
    if (param.type === 'block') {
      if (typeof input !== 'string') {
        isValid.push(false);
      } else {
        if (input === 'latest') {
          isValid.push(true);
        } else {
          const val = parseInt(input);
          isValid.push(!isNaN(val) && val >= 0 && val < 1e9);
        }
      }
    }
  }
  return isValid;
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
