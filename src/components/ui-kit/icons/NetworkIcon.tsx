import { FC, memo } from 'react';
import { NetworkEnum } from 'packages/networks';
import { SvgProps } from 'components/ui-kit/icons/typedefs';
import { EthereumIcon } from 'components/ui-kit/icons/EthereumIcon';
import { PolygonIcon } from 'components/ui-kit/icons/PolygonIcon';

interface Props extends SvgProps {
  network: NetworkEnum | null
}

export const NetworkIcon: FC<Props> = memo((props) => {
  const {
    network,
    ...rest
  } = props;

  switch (network) {
    case NetworkEnum.ETHEREUM:
      return <EthereumIcon {...rest} />;
    case NetworkEnum.POLYGON:
      return <PolygonIcon {...rest} />;
  }

  return <EthereumIcon {...rest} />;
});
