import { useRef } from 'react';
import cn from 'classnames';
import { AccountIcon } from 'components/ui-kit/icons/AccountIcon';
import { IdentIcon } from 'components/ui-kit/IdentIcon/IdentIcon';
import { useWallet } from 'contexts/walletCtx';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'routes/routes';
import { CreateIcon } from 'components/ui-kit/icons/CreateIcon';
import { CollectedIcon } from 'components/ui-kit/icons/CollectedIcon';
import { CommunityNftIcon } from 'components/ui-kit/icons/CommunityNftIconIcon';
import { useToggleVisibility } from 'hooks/useToggleVisibility';
import style from 'components/Header/NavDropdown.module.scss';

const NAV_ITEMS = [{
  to: ROUTES.create.index,
  title: 'Create',
  Icon: CreateIcon,
}, {
  to: ROUTES.collected,
  title: 'Collected',
  Icon: CollectedIcon,
}, {
  to: ROUTES.communityNft,
  title: 'Community NFT',
  Icon: CommunityNftIcon,
}];

export const NavDropdown = () => {
  const {
    account,
  } = useWallet();

  const targetElement = useRef<HTMLDivElement>(null);

  const [isVisible, toggleVisibility] = useToggleVisibility({
    targetElement,
  });

  return (
    <div ref={targetElement} className={style.dropdown}>
      <button
        className={cn(style.dropdownBtn, {
          [style.connected]: account,
        })}
        onClick={toggleVisibility}
      >
        {account ? (
          <IdentIcon
            address={account}
            diameter={36}
          />
        ) : (
          <AccountIcon className={style.accountIcon} />
        )}
      </button>

      <div
        className={style.list}
        hidden={!isVisible}
      >
        <nav className={style.nav}>
          <ul>
            {NAV_ITEMS.map(({ to, title, Icon }) => (
              <li key={to}>
                <NavLink
                  className={style.link}
                  to={to}
                  onClick={toggleVisibility}
                >
                  {title}
                  <Icon />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
