import { useEffect, memo, useState } from 'react';
import cn from 'classnames';
import { Logo } from 'components/Header/Logo';
import { NavDropdown } from 'components/Header/NavDropdown';
import { WalletButton } from 'components/ui-kit/buttons/WalletButton/WalletButton';
import style from 'components/Header/Header.module.scss';

export const Header = memo(() => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const mainEl = window.document.querySelector('main');
    const mainPaddingTop = window
      .getComputedStyle(mainEl!)
      .getPropertyValue('padding-top');
    const { scrollingElement } = window.document;

    window.document.addEventListener('scroll', () => {
      const scroll = scrollingElement?.scrollTop;

      if (
        mainPaddingTop
          && scroll
          && scroll > parseInt(mainPaddingTop, 10)
      ) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  return (
    <header
      className={cn(style.header, { [style.showBackground]: showBackground })}
    >
      <div className={style.logo}>
        <Logo />
      </div>

      <WalletButton />

      <NavDropdown />
    </header>
  );
});
