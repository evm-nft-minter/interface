import { WalletEnum, getWalletName } from 'packages/wallets';
import { WalletIcon } from 'components/ui-kit/icons/WalletIcon';
import style from 'components/WalletModal/ConnectButton.module.scss';

interface Props {
  wallet: WalletEnum
  onClick: (wallet: WalletEnum) => void
}

export const ConnectButton = (props: Props) => {
  const {
    wallet,
    onClick,
  } = props;

  const handleClick = () => onClick(wallet);

  return (
    <button
      className={style.button}
      onClick={handleClick}
    >
      <span>
        {getWalletName(wallet)}
      </span>

      <WalletIcon wallet={wallet} />
    </button>
  );
};
