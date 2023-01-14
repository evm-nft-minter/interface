import { WalletEnum } from 'packages/wallets/typedefs';
import { Wallet } from 'packages/wallets/Wallet';
import { MetaMask } from 'packages/wallets/MetaMask.wallet';
import { WalletConnect } from 'packages/wallets/WalletConnect.wallet';

export * from 'packages/wallets/typedefs';
export * from 'packages/wallets/Wallet';
export * from 'packages/wallets/MetaMask.wallet';
export * from 'packages/wallets/WalletConnect.wallet';

export const makeWallet = (wallet: WalletEnum): Wallet => {
  switch (wallet) {
    case WalletEnum.META_MASK:
      return new MetaMask();
    case WalletEnum.WALLET_CONNECT:
      return new WalletConnect();
  }

  throw new Error('Wallet must be defined');
};

export const getWalletName = (wallet: WalletEnum) => {
  switch (wallet) {
    case WalletEnum.META_MASK:
      return 'MetaMask';
    case WalletEnum.WALLET_CONNECT:
      return 'WalletConnect';
  }

  throw new Error('Wallet must be defined');
};
