import { LeftArrowIcon } from 'components/ui-kit/icons/LeftArrowIcon';
import style from 'components/ui-kit/buttons/BackButton.module.scss';

interface Props {
  onClick: () => void
}

export const BackButton = (props: Props) => {
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
