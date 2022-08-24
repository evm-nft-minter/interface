import { memo } from 'react';
import style from 'components/ui-kit/ConnectButton/ConnectButton.module.scss';

interface Props {
  onClick: () => void
}

export const ConnectButton = memo((props: Props) => {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className={style.button}
    >
      <span className={style.title}>
        Connect Wallet
      </span>
    </button>
  );
});
