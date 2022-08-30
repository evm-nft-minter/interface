import { memo } from 'react';
import { WalletStatus } from 'components/Header/WalletStatus';
import style from 'components/Header/Header.module.scss';
import { IdentIcon } from 'components/ui-kit/IdentIcon/IdentIcon';
import { Logo } from 'components/Header/Logo';
import { useWallet } from 'contexts/walletCtx';
import { AccountIcon } from 'components/ui-kit/icons/AccountIcon';

export const Header = memo(() => {
  const { account } = useWallet();

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Logo />
      </div>

      <WalletStatus />

      {account ? (
        <button className={style.identIcon}>
          <IdentIcon
            address={account}
            diameter={36}
          />
        </button>
      ) : (
        <button className={style.accountIcon}>
          <div className={style.accountIconWrapper}>
            <AccountIcon />
          </div>
        </button>
      )}
    </header>
  );
});
