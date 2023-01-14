import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { makeContext } from 'packages/makeContext';
import { ChainIdEnum } from 'packages/networks';
import {
  WalletEnum,
  WalletEventEnum,
  Wallet,
  makeWallet,
} from 'packages/wallets';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface WalletCtx {
  account: string | null
  chainId: ChainIdEnum | null
  wallet: WalletEnum | null
  connect: (wallet: WalletEnum) => Promise<void>
  disconnect: () => void
  // TODO: sendTx: (tx: TransactionConfig) => Promise<TransactionReceipt>
  sendTx: (tx: any) => Promise<any>
  switchNetwork: (chainId: ChainIdEnum) => Promise<boolean>
}

const context = makeContext<WalletCtx>('useWallet');

const [useWallet, Provider] = context;

export { useWallet };

export const WalletProvider = (props: PropsWithChildren) => {
  const [
    walletType, setWalletType,
  ] = useLocalStorage<WalletEnum | null>('wallet', null);
  const [
    account, setAccount,
  ] = useLocalStorage<string | null>('account', null);

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connect = useCallback(async (_walletType: WalletEnum) => {
    const _wallet = makeWallet(_walletType);

    const [_account, _chainId] = await _wallet.connect();

    setWalletType(_walletType);
    setWallet(_wallet);
    setChainId(_chainId);
    setAccount(_account);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnect = useCallback(() => {
    setWalletType(null);
    setWallet(null);
    setChainId(null);
    setAccount(null);

    wallet?.removeAllListeners(WalletEventEnum.ACCOUNT_CHANGED);
    wallet?.removeAllListeners(WalletEventEnum.CHAIN_CHANGED);
    wallet?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const sendTx = useCallback((tx: any) => {
  // TODO: const sendTx = useCallback((tx: TransactionConfig) => {
    if (!wallet) {
      throw new Error('Wallet must be defined');
    }

    return wallet.sendTx(tx);
  }, [wallet]);

  const switchNetwork = useCallback((_chainId: ChainIdEnum) => {
    if (!wallet) {
      throw new Error('Wallet must be defined');
    }

    return wallet.switchNetwork(_chainId);
  }, [wallet]);

  useEffect(() => {
    if (account && walletType) {
      connect(walletType)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          disconnect();
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    wallet?.on(WalletEventEnum.ACCOUNT_CHANGED, (
      _account: string | null,
    ) => {
      if (_account) {
        setAccount(_account);
      } else {
        disconnect();
      }
    });

    wallet?.on(WalletEventEnum.CHAIN_CHANGED, (
      _chainId: number,
    ) => {
      setChainId(_chainId);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <Provider
      value={{
        account,
        chainId,
        wallet: walletType,
        disconnect,
        connect,
        sendTx,
        switchNetwork,
      }}
    >
      {props.children}
    </Provider>
  );
};
