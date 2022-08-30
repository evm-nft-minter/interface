import { PropsWithChildren } from 'react';
import { Header } from 'components/Header/Header';
import style from 'components/Layout/Layout.module.scss';

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header />
      </div>

      <main className={style.main}>
        {props.children}
      </main>
    </div>
  );
};
