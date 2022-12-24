import { ChainIdEnum, Networks } from 'packages/networks/typedefs';

export * from 'packages/networks/typedefs';

export const NETWORKS: Networks = {
  [ChainIdEnum.ETHEREUM]: {
    chainId: ChainIdEnum.ETHEREUM,
    name: 'Rinkeby Testnet',
    rpc: 'https://rinkeby.infura.io/v3/',
    explorer: 'https://rinkeby.etherscan.io/',
    currency: 'ETH',
  },
  [ChainIdEnum.POLYGON]: {
    chainId: ChainIdEnum.POLYGON,
    name: 'Polygon Mainnet',
    rpc: 'https://rpc-mainnet.maticvigil.com/',
    explorer: 'https://polygonscan.com/',
    currency: 'MATIC',
  },
  [ChainIdEnum.BSC]: {
    chainId: ChainIdEnum.BSC,
    name: 'BSC Mainnet',
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com/',
    currency: 'BNB',
  },
  [ChainIdEnum.AVALANCHE]: {
    chainId: ChainIdEnum.AVALANCHE,
    name: 'Avalanche Mainnet C-Chain',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io/',
    currency: 'AVAX',
  },
  [ChainIdEnum.FANTOM]: {
    chainId: ChainIdEnum.FANTOM,
    name: 'Fantom Mainnet',
    rpc: 'https://rpcapi.fantom.network/',
    explorer: 'https://ftmscan.com/',
    currency: 'FTM',
  },
};
