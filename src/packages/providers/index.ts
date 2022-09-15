import { ProviderEnum } from 'packages/providers/typedefs';
import { Provider } from 'packages/providers/Provider';
import { MetaMask } from 'packages/providers/MetaMask.provider';
import { WalletConnect } from 'packages/providers/WalletConnect.provider';

export * from 'packages/providers/typedefs';
export * from 'packages/providers/Provider';
export * from 'packages/providers/MetaMask.provider';
export * from 'packages/providers/WalletConnect.provider';

export const makeProvider = (provider: ProviderEnum): Provider => {
  switch (provider) {
    case ProviderEnum.META_MASK:
      return new MetaMask();
    case ProviderEnum.WALLET_CONNECT:
      return new WalletConnect();
  }

  throw new Error('Provider must be defined');
};

export const getProviderName = (provider: ProviderEnum) => {
  switch (provider) {
    case ProviderEnum.META_MASK:
      return 'MetaMask';
    case ProviderEnum.WALLET_CONNECT:
      return 'WalletConnect';
  }

  throw new Error('Provider must be defined');
};
