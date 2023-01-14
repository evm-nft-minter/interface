import { FC, memo } from 'react';
import { SvgProps } from 'components/ui-kit/icons/typedefs';
import { WalletEnum } from 'packages/wallets';
import { MetaMaskIcon } from 'components/ui-kit/icons/MetaMaskIcon';
import { WalletConnectIcon } from 'components/ui-kit/icons/WalletConnectIcon';

interface Props extends SvgProps {
  wallet: WalletEnum | null
}

export const WalletIcon: FC<Props> = memo((props) => {
  const {
    wallet,
    ...rest
  } = props;

  switch (wallet) {
    case WalletEnum.META_MASK:
      return <MetaMaskIcon {...rest} />;
    case WalletEnum.WALLET_CONNECT:
      return <WalletConnectIcon {...rest} />;
  }

  return null;
});
