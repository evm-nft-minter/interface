import { Link } from 'react-router-dom';
import { LogoIcon } from 'components/ui-kit/icons/LogoIcon';
import { ROUTES } from 'routes/routes';
import style from 'components/Header/Logo.module.scss';

export const Logo = () => {
  return (
    <Link
      className={style.logo}
      to={ROUTES.home}
    >
      <LogoIcon className={style.icon} />

      <span className={style.name}>NFT MINTER</span>
    </Link>
  );
};
