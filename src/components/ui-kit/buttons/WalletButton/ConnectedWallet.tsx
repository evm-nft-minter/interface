import { useWallet } from 'contexts/walletCtx';
import { NetworkIcon } from 'components/ui-kit/icons/NetworkIcon';
import { sliceStringFromTo } from 'packages/tools';
import style from 'components/ui-kit/buttons/WalletButton/ConnectedWallet.module.scss';

export const ConnectedWallet = () => {
  const {
    account,
    chainId,
  } = useWallet();

  return (
    <span className={style.container}>
      <NetworkIcon
        className={style.icon}
        chainId={chainId}
      />

      {sliceStringFromTo(account || '', 6, -4)}
    </span>
  );
};
