import { useState, useCallback, useEffect } from 'react';
import { StatusEnum } from 'components/WalletModal/walletModal.typedefs';
import { useWallet } from 'contexts/walletCtx';
import { ProviderEnum } from 'packages/providers';

export const useWalletStatus = () => {
  const {
    account,
    connect,
    disconnect,
  } = useWallet();

  const [status, setStatus] = useState<StatusEnum>(StatusEnum.INITIAL);
  const [provider, setProvider] = useState<ProviderEnum | null>(null);

  const handleConnect = useCallback(async (_provider: ProviderEnum) => {
    setProvider(_provider);
    setStatus(StatusEnum.CONNECTING);

    try {
      await connect(_provider);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setStatus((prev) => (
        prev === StatusEnum.CONNECTING
          ? StatusEnum.ERROR
          : prev
      ));
    }
  }, [connect]);

  const updateStatus = useCallback(() => {
    setStatus(account ? StatusEnum.CONNECTED : StatusEnum.INITIAL);
  }, [account]);

  useEffect(() => {
    updateStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return {
    status,
    provider,
    handleConnect,
    handleDisconnect: disconnect,
    updateStatus,
  };
};
