import { FC, memo } from 'react';
import { ChainIdEnum } from 'packages/networks';
import { SvgProps } from 'components/ui-kit/icons/typedefs';
import { EthereumIcon } from 'components/ui-kit/icons/EthereumIcon';
import { PolygonIcon } from 'components/ui-kit/icons/PolygonIcon';

interface Props extends SvgProps {
  chainId: ChainIdEnum | null
}

export const NetworkIcon: FC<Props> = memo((props) => {
  const {
    chainId,
    ...rest
  } = props;

  switch (chainId) {
    case ChainIdEnum.ETHEREUM:
      return <EthereumIcon {...rest} />;
    case ChainIdEnum.POLYGON:
      return <PolygonIcon {...rest} />;
  }

  return <EthereumIcon {...rest} />;
});
