import { ProviderEnum, getProviderName } from 'packages/providers';
import { ProviderIcon } from 'components/ui-kit/icons/ProviderIcon';
import style from 'components/WalletModal/ConnectButton.module.scss';

interface Props {
  provider: ProviderEnum
  onClick: (provider: ProviderEnum) => void
}

export const ConnectButton = (props: Props) => {
  const {
    provider,
    onClick,
  } = props;

  const handleClick = () => onClick(provider);

  return (
    <button
      className={style.button}
      onClick={handleClick}
    >
      <span>
        {getProviderName(provider)}
      </span>

      <ProviderIcon provider={provider} />
    </button>
  );
};
