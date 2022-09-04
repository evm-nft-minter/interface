import { PropsWithChildren } from 'react';
import { Header } from 'components/Header/Header';
import style from 'components/Layout/Layout.module.scss';

export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main className={style.main}>
        {props.children}
      </main>
    </>
  );
};
