import { Param, PrimitiveParam, getArrayParamItem } from './methods';

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
    const itemInputs = input as unknown[];
    return itemInputs.every((itemInput, index) => {
      const itemParam = getArrayParamItem(param, index);
      return validatePrimitiveParam(itemParam, itemInput);
    });
  }
  if (param.type === 'object') {
    return Object.entries(param.items).every(([key, value]) =>
      validateParam(value, (input as Record<string, unknown>)[key]),
    );
  }
  return validatePrimitiveParam(param, input);
}

function validatePrimitiveParam(
  param: PrimitiveParam,
  input: unknown,
): boolean {
  if (param.type === 'boolean') {
    return typeof input === 'boolean';
  }
  if (typeof input !== 'string') {
    return false;
  }
  if (input === '') {
    return !param.isRequired;
  }
  switch (param.type) {
    case 'int': {
      const val = parseInt(input);
      return !isNaN(val) && val >= 0;
    }
    case 'addr':
      return isAddress(input);
    case 'hash':
      return isBytes32(input);
    case 'bytes32':
      return isBytes32(input);
    case 'bytes':
      return isBytes(input);
    case 'block': {
      if (isBlockTag(input)) {
        return true;
      } else {
        return isBlockNumber(input);
      }
    }
    case 'trace':
      return ['vmTrace', 'trace', 'statediff'].includes(input);
  }
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

function isBlockNumber(value: string): boolean {
  const val = parseInt(value);
  return !isNaN(val) && val >= 0 && val < 1e9;
}

function isBlockTag(value: string): boolean {
  return ['earliest', 'finalized', 'safe', 'latest', 'pending'].includes(value);
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

export { validateParam, validateParams, isBlockNumber, isBlockTag, isValidUrl };
