import { useCallback } from 'react';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useWallet } from 'contexts/walletCtx';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import style from 'components/WalletModal/WalletModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
  onDisconnected: () => void
}

export const WalletModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    onDisconnected,
  } = props;

  const { disconnect } = useWallet();

  const handleDisconnect = useCallback(async () => {
      disconnect();
      onDisconnected();
  }, [disconnect, onDisconnected]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      {({ ModalHeader, ModalContent }) => (
        <>
          <ModalHeader>
            <h1>
              Wallet Modal
            </h1>
          </ModalHeader>

          <ModalContent>
            <button onClick={handleDisconnect}>
              Disconnect
            </button>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
