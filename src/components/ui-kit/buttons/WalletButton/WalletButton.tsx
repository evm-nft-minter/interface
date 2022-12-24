import { memo } from 'react';
import { useWallet } from 'contexts/walletCtx';
import { ConnectedWallet } from 'components/ui-kit/buttons/WalletButton/ConnectedWallet';
import { ConnectWallet } from 'components/ui-kit/buttons/WalletButton/ConnectWallet';
import style from 'components/ui-kit/buttons/WalletButton/WalletButton.module.scss';

export const WalletButton = memo(() => {
  const {
    account,
    toggleWalletModal,
  } = useWallet();

  return (
    <button
      className={style.button}
      onClick={toggleWalletModal}
      type="button"
    >
      {account && <ConnectedWallet />}
      {!account && <ConnectWallet />}
    </button>
  );
});
