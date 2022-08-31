import { memo } from 'react';
import { Logo } from 'components/Header/Logo';
import { WalletStatus } from 'components/Header/WalletStatus';
import { NavDropdown } from 'components/Header/NavDropdown';
import style from 'components/Header/Header.module.scss';

export const Header = memo(() => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Logo />
      </div>

      <WalletStatus />

      <NavDropdown />
    </header>
  );
});
