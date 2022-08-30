export const sliceStringFromTo = (
  string: string,
  from: number,
  to: number,
) => `${string.slice(0, from)}...${string.slice(to)}`;
