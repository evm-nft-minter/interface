import { PropsWithChildren } from 'react';
import { makeContext } from 'packages/makeContext';
import { useModalState } from 'hooks/useModalState';
import { WalletModal } from 'components/WalletModal/WalletModal';

export enum ModalEnum {
  WALLET = 'wallet',
  NAV_BLOCKER = 'nav_blocker',
}

type ModalsCtx = Record<ModalEnum, ReturnType<typeof useModalState>>;

const context = makeContext<ModalsCtx>('useModals');

const [useModals, Provider] = context;

export const ModalsProvider = (props: PropsWithChildren) => {
  const walletState = useModalState();
  const navBlockerState = useModalState();

  const [isWalletOpen,, closeWallet] = walletState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNavBlockerOpen,, closeNavBlocker] = navBlockerState;

  return (
    <>
      <WalletModal
        isOpen={isWalletOpen}
        onClose={closeWallet}
      />

      <Provider
        value={{
          [ModalEnum.WALLET]: walletState,
          [ModalEnum.NAV_BLOCKER]: navBlockerState,
        }}
      >
        {props.children}
      </Provider>
    </>
  );
};

export const useModal = (modal: ModalEnum) => {
  const ctx = useModals();

  const [isOpen, open, close] = ctx[modal];

  return {
    isOpen,
    open,
    close,
  };
};
