import { WalletProvider } from 'contexts/walletCtx';
import { RoutesResolver } from 'routes/RoutesResolver';

export const App = () => {
  return (
    <WalletProvider>
      <RoutesResolver />
    </WalletProvider>
  );
};
