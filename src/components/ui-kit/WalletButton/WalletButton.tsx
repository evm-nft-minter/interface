import { memo } from 'react';
import { useWallet } from 'contexts/walletCtx';
import style from 'components/ui-kit/WalletButton/WalletButton.module.scss';

interface Props {
  onClick: () => void
}

export const WalletButton = memo((props: Props) => {
  const { onClick } = props;
  const { account } = useWallet();

  return (
    <button
      className={style.button}
      onClick={onClick}
    >
      {account}
    </button>
  );
});
