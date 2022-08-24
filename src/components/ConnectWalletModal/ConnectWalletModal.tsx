import { Modal } from 'components/ui-kit/Modal/Modal';
import { useWallet } from 'contexts/walletCtx';
import { useCallback } from 'react';
import { ProviderEnum } from 'providers/typedefs';
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
      <div className={style.modal}>
        <h1>
          Connect Wallet Modal
        </h1>

        <button onClick={handleConnect}>
          Connect
        </button>
      </div>
    </Modal>
  );
};
