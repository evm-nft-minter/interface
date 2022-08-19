export enum NetworkEnum {
  ETHEREUM = 'ethereum',
}

export interface Network {
  chainId: number
  name: string
  rpc: string
  explorer: string
  currency: string
}

export type Networks = Record<NetworkEnum, Network>;
