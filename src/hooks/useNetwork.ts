import Web3 from 'web3';
import { NETWORKS } from 'networks/networks';
import { NetworkEnum } from 'networks/typedefs';

const NETWORK_TO_WEB3 = Object.entries(NETWORKS).reduce(
  (acc, [network, { rpc }]) => ({ ...acc, [network]: new Web3(rpc) }),
  {} as Record<NetworkEnum, Web3>,
);

export const useNetwork = (network: NetworkEnum) => {
  const {
    name,
    rpc,
    chainId,
    currency,
    explorer,
  } = NETWORKS[network];

  const web3 = NETWORK_TO_WEB3[network];

  return {
    name,
    rpc,
    chainId,
    currency,
    explorer,
    web3,
  };
};
