import { FC, memo } from 'react';
import { SvgProps } from 'components/ui-kit/icons/typedefs';
import { ProviderEnum } from 'packages/providers';
import { MetaMaskIcon } from 'components/ui-kit/icons/MetaMaskIcon';
import { WalletConnectIcon } from 'components/ui-kit/icons/WalletConnectIcon';

interface Props extends SvgProps {
  provider: ProviderEnum | null
}

export const ProviderIcon: FC<Props> = memo((props) => {
  const {
    provider,
    ...rest
  } = props;

  switch (provider) {
    case ProviderEnum.META_MASK:
      return <MetaMaskIcon {...rest} />;
    case ProviderEnum.WALLET_CONNECT:
      return <WalletConnectIcon {...rest} />;
  }

  return null;
});
