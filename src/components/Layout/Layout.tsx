import { PropsWithChildren } from 'react';
import { ModalsProvider } from 'contexts/modalsCtx';
import { Header } from 'components/Header/Header';
import style from 'components/Layout/Layout.module.scss';

export const Layout = (props: PropsWithChildren) => {
  return (
    <ModalsProvider>
      <Header />

      <main className={style.main}>
        {props.children}
      </main>
    </ModalsProvider>
  );
};
