import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { ConnectButton } from 'components/WalletModal/ConnectButton';
import { WalletEnum } from 'packages/wallets';
import style from 'components/WalletModal/InitialModalContent.module.scss';

interface Props {
  onConnect: (wallet: WalletEnum) => void
}

export const InitialModalContent = (props: Props) => {
  const {
    onConnect,
  } = props;

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <h1>Connect a wallet</h1>
          </ModalHeader>

          <ModalMain className={style.main}>
            <ConnectButton
              wallet={WalletEnum.META_MASK}
              onClick={onConnect}
            />

            <ConnectButton
              wallet={WalletEnum.WALLET_CONNECT}
              onClick={onConnect}
            />
          </ModalMain>
        </>
        )}
    </ModalContent>
  );
};
