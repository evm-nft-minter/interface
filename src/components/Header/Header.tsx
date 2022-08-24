import { memo } from 'react';
import { WalletStatus } from 'components/Header/WalletStatus';

export const Header = memo(() => {
  return (
    <header>
      <WalletStatus />
    </header>
  );
});
