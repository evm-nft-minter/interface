import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useWallet } from 'contexts/walletCtx';
import { ProviderEnum } from 'packages/providers';
import { InitialModalContent } from 'components/WalletModal/InitialModalContent';
import { ConnectingModalContent } from 'components/WalletModal/ConnectingModalContent';
import { ErrorModalContent } from 'components/WalletModal/ErrorModalContent';
import { ConnectedModalContent } from 'components/WalletModal/ConnectedModalContent';
import style from 'components/WalletModal/WalletModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
}

enum StatusEnum {
  INITIAL = 'initial',
  CONNECTING = 'connecting',
  ERROR = 'error',
  CONNECTED = 'connected',
}

export const WalletModal = (props: Props) => {
  const {
    isOpen,
    onClose,
  } = props;

  const {
    account,
    connect,
    disconnect,
  } = useWallet();

  const [
    status, setStatus,
  ] = useState<StatusEnum>(StatusEnum.INITIAL);
  const [provider, setProvider] = useState<ProviderEnum | null>(null);

  const handleConnect = useCallback(async (_provider: ProviderEnum) => {
    setStatus(StatusEnum.CONNECTING);

    try {
      await connect(_provider);
      setStatus(StatusEnum.CONNECTED);
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

  const handleSelectProvider = useCallback((_provider: ProviderEnum) => {
    setProvider(_provider);
    handleConnect(_provider);
  }, [handleConnect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setStatus(StatusEnum.INITIAL);
  }, [disconnect]);

  const goToInitial = useCallback(() => {
    setProvider(null);
    setStatus(StatusEnum.INITIAL);
  }, []);

  useEffect(() => {
    setStatus(
      account
        ? StatusEnum.CONNECTED
        : StatusEnum.INITIAL,
    );
  }, [account, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={style.container}>
        {status === StatusEnum.INITIAL && (
          <InitialModalContent
            onSelectProvider={handleSelectProvider}
          />
        )}

        {status === StatusEnum.CONNECTING && (
          <ConnectingModalContent
            onClickBack={goToInitial}
          />
        )}

        {status === StatusEnum.ERROR && (
          <ErrorModalContent
            provider={provider}
            onTryAgain={handleConnect}
            onClickBack={goToInitial}
          />
        )}

        {status === StatusEnum.CONNECTED && (
          <ConnectedModalContent
            onDisconnect={handleDisconnect}
          />
        )}
      </div>
    </Modal>
  );
};
