import Web3 from 'web3';
import { NETWORKS, NetworkEnum, Network } from 'packages/networks';

const NETWORK_TO_WEB3 = Object.values(NETWORKS).reduce(
  (acc, network) => ({ ...acc, [network.type]: new Web3(network.rpc) }),
  {} as Record<NetworkEnum, Web3>,
);

interface Result extends Network {
  web3: Web3
}

export const useNetwork = (network: NetworkEnum): Result => {
  const {
    type,
    name,
    rpc,
    chainId,
    currency,
    explorer,
  } = NETWORKS[network];

  const web3 = NETWORK_TO_WEB3[network];

  return {
    type,
    name,
    rpc,
    chainId,
    currency,
    explorer,
    web3,
  };
};
