import { useCallback } from 'react';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useWallet } from 'contexts/walletCtx';
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
      <div className={style.container}>
        <h1>
          Wallet Modal
        </h1>

        <button onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>
    </Modal>
  );
};
