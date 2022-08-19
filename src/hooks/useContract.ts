import { useMemo } from 'react';
import { useNetwork } from 'hooks/useNetwork';
import { NetworkEnum } from 'networks/typedefs';

export const useContract = (
  network: NetworkEnum,
  abi: any,
  address: string,
) => {
  const { web3 } = useNetwork(network);

  return useMemo(() => new web3.eth.Contract(
    abi,
    address,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [network]);
};
