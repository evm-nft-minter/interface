import { TokenAttribute } from 'packages/token/typedefs';

export * from 'packages/token/typedefs';

const EMPTY_ATTRIBUTE: TokenAttribute = {
  traitType: '',
  value: '',
};

export const generateAttribute = () => {
  return { ...EMPTY_ATTRIBUTE };
};
