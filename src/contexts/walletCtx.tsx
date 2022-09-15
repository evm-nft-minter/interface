import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { makeContext } from 'packages/makeContext';
import { CHAIN_ID_TO_NETWORK, NetworkEnum } from 'packages/networks';
import {
  ProviderEnum,
  ProviderEventEnum,
  Provider,
  makeProvider,
} from 'packages/providers';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { WalletModal } from 'components/WalletModal/WalletModal';
import { useModal } from 'hooks/useModal';

interface WalletCtx {
  account: string | null
  chainId: number | null
  network: NetworkEnum | null
  provider: ProviderEnum | null
  connect: (provider: ProviderEnum) => Promise<void>
  disconnect: () => void
  sendTx: (tx: TransactionConfig) => Promise<TransactionReceipt>
  switchNetwork: (network: NetworkEnum) => Promise<boolean>
  toggleWalletModal: () => void
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
      connect(providerType)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
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

  const [isWalletModalOpen, toggleWalletModal] = useModal();

  return (
    <CtxProvider
      value={{
        account,
        chainId,
        provider: providerType,
        network: chainId ? CHAIN_ID_TO_NETWORK[chainId] : null,
        disconnect,
        connect,
        sendTx,
        switchNetwork,
        toggleWalletModal,
      }}
    >
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={toggleWalletModal}
      />
      {props.children}
    </CtxProvider>
  );
};
