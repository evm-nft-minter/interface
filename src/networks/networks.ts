import { NetworkEnum, Networks } from 'networks/typedefs';

export const NETWORKS: Networks = {
  [NetworkEnum.ETHEREUM]: {
    name: 'Rinkeby Testnet',
    rpc: 'https://rinkeby.infura.io/v3/',
    chainId: 4,
    currency: 'ETH',
    explorer: 'https://rinkeby.etherscan.io',
  },
};

export const NETWORK_LIST: NetworkEnum[] = Object.values(NetworkEnum)
  .filter((el) => !(typeof el === 'number'));
