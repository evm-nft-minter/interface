import { v4 as uuidv4 } from 'uuid';
import { Attribute } from 'typedefs/common';

export const sliceStringFromTo = (
  string: string,
  from: number,
  to: number,
) => `${string.slice(0, from)}...${string.slice(to)}`;

const EMPTY_ATTRIBUTE: Attribute = {
  id: '',
  traitType: '',
  value: '',
};

export const generateAttribute = (attr: Partial<Attribute> = {}): Attribute => {
  const id = uuidv4();

  return {
    ...EMPTY_ATTRIBUTE,
    ...attr,
    id,
  };
};
