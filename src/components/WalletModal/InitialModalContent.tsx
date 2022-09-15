import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { ConnectButton } from 'components/WalletModal/ConnectButton';
import { ProviderEnum, MetaMask } from 'packages/providers';
import style from 'components/WalletModal/InitialModalContent.module.scss';

interface Props {
  onSelectProvider: (provider: ProviderEnum) => void
}

export const InitialModalContent = (props: Props) => {
  const {
    onSelectProvider,
  } = props;

  const handleSelectMetamask = useCallback(() => {
    if (MetaMask.isInstalled()) {
      onSelectProvider(ProviderEnum.META_MASK);

      return;
    }

    if (isMobile) {
      const { host, pathname } = window.location;

      window.location.href = `${MetaMask.MOBILE_APP_URL}/${host}${pathname}`;
    } else {
      window.open(MetaMask.EXTENSION_URL, '_blank');
    }
  }, [onSelectProvider]);

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <h1>Connect a wallet</h1>
          </ModalHeader>

          <ModalMain className={style.main}>
            <ConnectButton
              provider={ProviderEnum.META_MASK}
              onClick={handleSelectMetamask}
            />

            <ConnectButton
              provider={ProviderEnum.WALLET_CONNECT}
              onClick={onSelectProvider}
            />
          </ModalMain>
        </>
        )}
    </ModalContent>
  );
};
