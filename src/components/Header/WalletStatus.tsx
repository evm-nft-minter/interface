import { memo, useCallback, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import { ConnectButton } from 'components/ui-kit/ConnectButton/ConnectButton';
import { WalletButton } from 'components/ui-kit/WalletButton/WalletButton';
import { ConnectWalletModal } from 'components/ConnectWalletModal/ConnectWalletModal';
import { WalletModal } from 'components/WalletModal/WalletModal';
import { useWallet } from 'contexts/walletCtx';

export const WalletStatus = memo(() => {
  const { account } = useWallet();

  const [isConnectModalOpen, toggleConnectModal] = useModal();
  const [isWalletModalOpen, toggleWalletModal] = useModal();

  const switchModal = useCallback(() => {
    toggleConnectModal();
    toggleWalletModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!account && isWalletModalOpen) {
      switchModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      {!account && <ConnectButton onClick={toggleConnectModal} />}
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={toggleConnectModal}
        onConnected={switchModal}
      />

      {account && <WalletButton onClick={toggleWalletModal} />}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={toggleWalletModal}
        onDisconnected={switchModal}
      />
    </>
  );
});
