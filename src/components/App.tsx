import { WalletProvider } from 'contexts/walletCtx';
import { Router } from 'routes/Router';

export const App = () => {
  return (
    <WalletProvider>
      <Router />
    </WalletProvider>
  );
};
