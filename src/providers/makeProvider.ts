import { Provider } from 'providers/Provider';
import { ProviderEnum } from 'providers/typedefs';
import { MetaMask } from 'providers/MetaMask.provider';
import { WalletConnect } from 'providers/WalletConnect.provider';

export const makeProvider = (provider: ProviderEnum): Provider => {
  switch (provider) {
    case ProviderEnum.META_MASK:
      return new MetaMask();
    case ProviderEnum.WALLET_CONNECT:
      return new WalletConnect();
  }

  throw new Error('Provider must be defined');
};
