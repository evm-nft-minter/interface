import { memo } from 'react';
import { useWallet } from 'contexts/walletCtx';
import { ConnectedWallet } from 'components/ui-kit/buttons/WalletButton/ConnectedWallet';
import { ConnectWallet } from 'components/ui-kit/buttons/WalletButton/ConnectWallet';
import { useModal, ModalEnum } from 'contexts/modalsCtx';
import style from 'components/ui-kit/buttons/WalletButton/WalletButton.module.scss';

export const WalletButton = memo(() => {
  const {
    account,
  } = useWallet();

  const { open } = useModal(ModalEnum.WALLET);

  return (
    <button
      className={style.button}
      onClick={open}
      type="button"
    >
      {account && <ConnectedWallet />}
      {!account && <ConnectWallet />}
    </button>
  );
});
