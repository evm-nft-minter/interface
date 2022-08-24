import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { makeContext } from 'tools/makeContext';
import { NetworkEnum } from 'networks/typedefs';
import { ProviderEnum, ProviderEventEnum } from 'providers/typedefs';
import { Provider } from 'providers/Provider';
import { makeProvider } from 'providers/makeProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface WalletCtx {
  account: string | null
  chainId: number | null
  provider: ProviderEnum | null
  connect: (provider: ProviderEnum) => Promise<void>
  disconnect: () => void
  sendTx: (tx: TransactionConfig) => Promise<TransactionReceipt>
  switchNetwork: (network: NetworkEnum) => Promise<boolean>
}

const context = makeContext<WalletCtx>('useWallet');

const [useWallet, CtxProvider] = context;

export { useWallet };

export const WalletProvider = (props: PropsWithChildren) => {
  const [
    providerType, setProviderType,
  ] = useLocalStorage<ProviderEnum | null>('provider', null);
  const [
    account, setAccount,
  ] = useLocalStorage<string | null>('account', null);

  const [provider, setProvider] = useState<Provider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connect = useCallback(async (_providerType: ProviderEnum) => {
    const _provider = makeProvider(_providerType);

    const [_account, _chainId] = await _provider.connect();

    setProviderType(_providerType);
    setProvider(_provider);
    setChainId(_chainId);
    setAccount(_account);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnect = useCallback(() => {
    setProviderType(null);
    setProvider(null);
    setChainId(null);
    setAccount(null);

    provider?.removeAllListeners(ProviderEventEnum.ACCOUNT_CHANGED);
    provider?.removeAllListeners(ProviderEventEnum.CHAIN_CHANGED);
    provider?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const sendTx = useCallback((tx: TransactionConfig) => {
    if (!provider) {
      throw new Error('Provider must be defined');
    }

    return provider.sendTx(tx);
  }, [provider]);

  const switchNetwork = useCallback((network: NetworkEnum) => {
    if (!provider) {
      throw new Error('Provider must be defined');
    }

    return provider.switchNetwork(network);
  }, [provider]);

  useEffect(() => {
    if (account && providerType) {
      connect(providerType).catch(() => {
        disconnect();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    provider?.on(ProviderEventEnum.ACCOUNT_CHANGED, (
      _account: string | null,
    ) => {
      if (_account) {
        setAccount(_account);
      } else {
        disconnect();
      }
    });

    provider?.on(ProviderEventEnum.CHAIN_CHANGED, (
      _chainId: number,
    ) => {
      setChainId(_chainId);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <CtxProvider
      value={{
        account,
        chainId,
        provider: providerType,
        disconnect,
        connect,
        sendTx,
        switchNetwork,
      }}
    >
      {props.children}
    </CtxProvider>
  );
};
