import { v4 as uuidv4 } from 'uuid';
import { TokenAttribute } from 'packages/token/typedefs';

export * from 'packages/token/typedefs';

const EMPTY_ATTRIBUTE: TokenAttribute = {
  id: '',
  traitType: '',
  value: '',
};

export const generateAttribute = (
  attr: Partial<TokenAttribute> = {},
): TokenAttribute => {
  const id = uuidv4();

  return {
    ...EMPTY_ATTRIBUTE,
    ...attr,
    id,
  };
};
