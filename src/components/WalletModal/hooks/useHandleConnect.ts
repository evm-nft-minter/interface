import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { MetaMask, WalletEnum } from 'packages/wallets';

export const useHandleConnect = (
  onConnect: (wallet: WalletEnum) => void,
) => {
  const handleConnectMetamask = useCallback(() => {
    if (MetaMask.isInstalled()) {
      onConnect(WalletEnum.META_MASK);

      return;
    }

    if (isMobile) {
      const { host, pathname } = window.location;

      window.location.href = `${MetaMask.MOBILE_APP_URL}/${host}${pathname}`;
    } else {
      window.open(MetaMask.EXTENSION_URL, '_blank');
    }
  }, [onConnect]);

  return useCallback((wallet: WalletEnum) => {
    switch (wallet) {
      case WalletEnum.META_MASK:
        handleConnectMetamask();

        return;
      default:
        onConnect(wallet);
    }
  }, [handleConnectMetamask, onConnect]);
};
