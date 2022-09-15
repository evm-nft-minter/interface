import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { MetaMask, ProviderEnum } from 'packages/providers';

export const useHandleConnect = (
  onConnect: (provider: ProviderEnum) => void,
) => {
  const handleConnectMetamask = useCallback(() => {
    if (MetaMask.isInstalled()) {
      onConnect(ProviderEnum.META_MASK);

      return;
    }

    if (isMobile) {
      const { host, pathname } = window.location;

      window.location.href = `${MetaMask.MOBILE_APP_URL}/${host}${pathname}`;
    } else {
      window.open(MetaMask.EXTENSION_URL, '_blank');
    }
  }, [onConnect]);

  return useCallback((provider: ProviderEnum) => {
    switch (provider) {
      case ProviderEnum.META_MASK:
        handleConnectMetamask();

        return;
      default:
        onConnect(provider);
    }
  }, [handleConnectMetamask, onConnect]);
};
