export enum NetworkEnum {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BSC = 'bsc',
  AVALANCHE = 'avalanche',
  FANTOM = 'fantom',
}

export interface Network {
  type: NetworkEnum
  chainId: number
  name: string
  rpc: string
  explorer: string
  currency: string
}

export type Networks = Record<NetworkEnum, Network>;
