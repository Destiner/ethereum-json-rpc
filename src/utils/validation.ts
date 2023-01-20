import { Param } from './methods';

function validateParams(params: Param[], inputs: unknown[]): boolean[] {
  const isValid: boolean[] = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const input = inputs[i];
    isValid.push(validateParam(param, input));
  }
  return isValid;
}

function validateParam(param: Param, input: unknown): boolean {
  if (param.type === 'array') {
    return param.items.every((item, index) =>
      validateParam(item, (input as unknown[])[index]),
    );
  }
  if (param.type === 'object') {
    return Object.entries(param.items).every(([key, value]) =>
      validateParam(value, (input as Record<string, unknown>)[key]),
    );
  }
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
    if (param.type === 'addr') {
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
        if (
          ['earliest', 'finalized', 'safe', 'latest', 'pending'].includes(input)
        ) {
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
  const hashRegex = /^0x[0-9a-f]*$/;
  const hasEvenByteNum = value.length % 2 === 0;
  return !!value.match(hashRegex) && hasEvenByteNum;
}

function isValidUrl(value: string): boolean {
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!value.match(urlRegex);
}

export { validateParam, validateParams, isValidUrl };
