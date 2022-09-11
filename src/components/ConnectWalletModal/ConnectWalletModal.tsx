import { Modal } from 'components/ui-kit/Modal/Modal';
import { useWallet } from 'contexts/walletCtx';
import { useCallback } from 'react';
import { ProviderEnum } from 'providers/typedefs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import style from 'components/ConnectWalletModal/ConnectWalletModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
  onConnected: () => void
}

export const ConnectWalletModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    onConnected,
  } = props;

  const { connect } = useWallet();

  const handleConnect = useCallback(async () => {
    try {
      await connect(ProviderEnum.META_MASK);

      onConnected();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [connect, onConnected]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      {({ ModalHeader, ModalContent }) => (
        <>
          <ModalHeader>
            <h1>
              Connect Wallet Modal
            </h1>
          </ModalHeader>

          <ModalContent>
            <button onClick={handleConnect}>
              Connect
            </button>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
