import { NetworkEnum, Networks } from 'packages/networks/typedefs';

export * from 'packages/networks/typedefs';

export const NETWORKS: Networks = {
  [NetworkEnum.ETHEREUM]: {
    type: NetworkEnum.ETHEREUM,
    chainId: 4,
    name: 'Rinkeby Testnet',
    rpc: 'https://rinkeby.infura.io/v3/',
    explorer: 'https://rinkeby.etherscan.io/',
    currency: 'ETH',
  },
  [NetworkEnum.POLYGON]: {
    type: NetworkEnum.POLYGON,
    chainId: 137,
    name: 'Polygon Mainnet',
    rpc: 'https://rpc-mainnet.maticvigil.com/',
    explorer: 'https://polygonscan.com/',
    currency: 'MATIC',
  },
  [NetworkEnum.BSC]: {
    type: NetworkEnum.BSC,
    chainId: 56,
    name: 'BSC Mainnet',
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com/',
    currency: 'BNB',
  },
  [NetworkEnum.AVALANCHE]: {
    type: NetworkEnum.AVALANCHE,
    chainId: 43114,
    name: 'Avalanche Mainnet C-Chain',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io/',
    currency: 'AVAX',
  },
  [NetworkEnum.FANTOM]: {
    type: NetworkEnum.FANTOM,
    chainId: 250,
    name: 'Fantom Mainnet',
    rpc: 'https://rpcapi.fantom.network/',
    explorer: 'https://ftmscan.com/',
    currency: 'FTM',
  },
};

export const NETWORK_LIST: NetworkEnum[] = Object.values(NetworkEnum)
  .filter((el) => !(typeof el === 'number'));

export const CHAIN_ID_TO_NETWORK: Record<number, NetworkEnum> = (
  Object.values(NETWORKS)
    .reduce((acc, network) => ({
      ...acc,
      [network.chainId]: network.type,
    }), {})
);
