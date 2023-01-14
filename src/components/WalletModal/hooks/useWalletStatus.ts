import { useState, useCallback, useEffect } from 'react';
import { StatusEnum } from 'components/WalletModal/walletModal.typedefs';
import { useWallet } from 'contexts/walletCtx';
import { WalletEnum } from 'packages/wallets';

export const useWalletStatus = () => {
  const {
    account,
    connect,
    disconnect,
  } = useWallet();

  const [status, setStatus] = useState<StatusEnum>(StatusEnum.INITIAL);
  const [wallet, setWallet] = useState<WalletEnum>(WalletEnum.META_MASK);

  const handleConnect = useCallback(async (_wallet: WalletEnum) => {
    setWallet(_wallet);
    setStatus(StatusEnum.CONNECTING);

    try {
      await connect(_wallet);
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
    account,
    wallet,
    handleConnect,
    handleDisconnect: disconnect,
    updateStatus,
  };
};
