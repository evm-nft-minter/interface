import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackIcon } from 'components/ui-kit/icons/BackIcon';
import style from 'components/ui-kit/buttons/BackButton.module.scss';

interface Props {
  onClick?: () => void
  to?: string
}

export const BackButton = (props: Props) => {
  const {
    onClick,
    to,
  } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (to) {
      navigate(`/${to}`);
    }

    if (onClick) {
      onClick();
    }
  }, [navigate, onClick, to]);

  return (
    <button
      className={style.button}
      onClick={handleClick}
    >
      <BackIcon className={style.icon} />
    </button>
  );
};
