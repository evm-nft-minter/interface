import { memo } from 'react';
import { useWallet } from 'contexts/walletCtx';
import { NetworkIcon } from 'components/ui-kit/icons/NetworkIcon';
import { sliceStringFromTo } from 'tools/common';
import style from 'components/ui-kit/WalletButton/WalletButton.module.scss';

interface Props {
  onClick: () => void
}

export const WalletButton = memo((props: Props) => {
  const { onClick } = props;

  const {
    account,
    network,
  } = useWallet();

  return (
    <button
      className={style.button}
      onClick={onClick}
    >
      <span className={style.title}>
        <NetworkIcon
          className={style.icon}
          network={network}
        />

        {account && sliceStringFromTo(account, 6, -4)}
      </span>
    </button>
  );
});
