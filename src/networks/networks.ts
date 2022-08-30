import { NetworkEnum, Networks } from 'networks/typedefs';

export const NETWORKS: Networks = {
  [NetworkEnum.ETHEREUM]: {
    type: NetworkEnum.ETHEREUM,
    chainId: 4,
    name: 'Rinkeby Testnet',
    rpc: 'https://rinkeby.infura.io/v3/',
    explorer: 'https://rinkeby.etherscan.io',
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
