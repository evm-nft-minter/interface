import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackIcon } from 'components/ui-kit/icons/BackIcon';
import style from 'components/ui-kit/buttons/BackButton/BackButton.module.scss';

interface Props {
  onClick?: () => void
  to?: string
  delta?: number
}

export const BackButton = memo((props: Props) => {
  const {
    to,
    delta,
    onClick,
  } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (to) {
      navigate(`/${to}`);
    }

    if (delta) {
      navigate(delta);
    }

    if (onClick) {
      onClick();
    }
  }, [navigate, onClick, to, delta]);

  return (
    <button
      className={style.button}
      onClick={handleClick}
    >
      <BackIcon className={style.icon} />
    </button>
  );
});
