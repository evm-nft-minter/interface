export enum ChainIdEnum {
  ETHEREUM = 4,
  POLYGON = 137,
  BSC = 56,
  AVALANCHE = 43114,
  FANTOM = 250,
}

export interface Network {
  chainId: ChainIdEnum
  name: string
  rpc: string
  explorer: string
  currency: string
}

export type Networks = Record<ChainIdEnum, Network>;
