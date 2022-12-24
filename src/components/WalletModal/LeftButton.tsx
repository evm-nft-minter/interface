import { LeftArrowIcon } from 'components/ui-kit/icons/LeftArrowIcon';
import style from 'components/WalletModal/LeftButton.module.scss';

interface Props {
  onClick: () => void
}

export const LeftButton = (props: Props) => {
  const {
    onClick,
  } = props;

  return (
    <button
      className={style.button}
      onClick={onClick}
    >
      <LeftArrowIcon className={style.icon} />
    </button>
  );
};
