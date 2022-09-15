import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { ConnectButton } from 'components/WalletModal/ConnectButton';
import { ProviderEnum } from 'packages/providers';
import { useHandleConnect } from 'components/WalletModal/hooks/useHandleConnect';
import style from 'components/WalletModal/InitialModalContent.module.scss';

interface Props {
  onConnect: (provider: ProviderEnum) => void
}

export const InitialModalContent = (props: Props) => {
  const {
    onConnect,
  } = props;

  const handleConnect = useHandleConnect(onConnect);

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
              onClick={handleConnect}
            />

            <ConnectButton
              provider={ProviderEnum.WALLET_CONNECT}
              onClick={handleConnect}
            />
          </ModalMain>
        </>
        )}
    </ModalContent>
  );
};
