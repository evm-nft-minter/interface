import { useEffect } from 'react';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { InitialModalContent } from 'components/WalletModal/InitialModalContent';
import { ConnectingModalContent } from 'components/WalletModal/ConnectingModalContent';
import { ErrorModalContent } from 'components/WalletModal/ErrorModalContent';
import { ConnectedModalContent } from 'components/WalletModal/ConnectedModalContent';
import { StatusEnum } from 'components/WalletModal/walletModal.typedefs';
import { useWalletStatus } from 'components/WalletModal/hooks/useWalletStatus';
import style from 'components/WalletModal/WalletModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal = (props: Props) => {
  const {
    isOpen,
    onClose,
  } = props;

  const {
    status,
    provider,
    handleConnect,
    handleDisconnect,
    updateStatus,
  } = useWalletStatus();

  useEffect(() => {
    updateStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={style.container}>
        {status === StatusEnum.INITIAL && (
          <InitialModalContent
            onConnect={handleConnect}
          />
        )}

        {status === StatusEnum.CONNECTING && (
          <ConnectingModalContent
            onClickBack={updateStatus}
          />
        )}

        {status === StatusEnum.ERROR && (
          <ErrorModalContent
            provider={provider}
            onTryAgain={handleConnect}
            onClickBack={updateStatus}
          />
        )}

        {status === StatusEnum.CONNECTED && (
          <ConnectedModalContent
            onDisconnect={handleDisconnect}
          />
        )}
      </div>
    </Modal>
  );
};
