import { PropsWithChildren } from 'react';
import { useWallet } from 'contexts/walletCtx';
import { Header } from 'components/Header/Header';
import { IdentIcon } from 'components/ui-kit/IdentIcon/IdentIcon';
import style from 'components/Layout/Layout.module.scss';

export const Layout = (props: PropsWithChildren) => {
  const {
    account,
    chainId,
  } = useWallet();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header />
      </div>

      <main className={style.main}>
        {`account: ${account}`}
        <br />
        {`chainId: ${chainId}`}
        <br />
        <IdentIcon />
        {props.children}
      </main>
    </div>
  );
};
