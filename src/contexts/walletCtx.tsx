import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { makeContext } from 'packages/makeContext';
import { ChainIdEnum } from 'packages/networks';
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
  chainId: ChainIdEnum | null
  provider: ProviderEnum | null
  connect: (provider: ProviderEnum) => Promise<void>
  disconnect: () => void
  // TODO: sendTx: (tx: TransactionConfig) => Promise<TransactionReceipt>
  sendTx: (tx: any) => Promise<any>
  switchNetwork: (chainId: ChainIdEnum) => Promise<boolean>
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

  const sendTx = useCallback((tx: any) => {
  // TODO: const sendTx = useCallback((tx: TransactionConfig) => {
    if (!provider) {
      throw new Error('Provider must be defined');
    }

    return provider.sendTx(tx);
  }, [provider]);

  const switchNetwork = useCallback((_chainId: ChainIdEnum) => {
    if (!provider) {
      throw new Error('Provider must be defined');
    }

    return provider.switchNetwork(_chainId);
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
        disconnect,
        connect,
        sendTx,
        switchNetwork,
        toggleWalletModal,
      }}
    >
      {props.children}

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={toggleWalletModal}
      />
    </CtxProvider>
  );
};
