import {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useModal } from 'hooks/useModal';

interface Props {
  isBlock?: boolean
}

export const NavigationBlocker = (props: Props) => {
  const {
    isBlock = true,
  } = props;

  const { navigator } = useContext(NavigationContext);

  const [isConfirmModalOpen, toggleConfirmModal] = useModal();

  const retry = useRef(() => undefined);
  const unblock = useRef(() => undefined);

  const confirmNavigation = useCallback(() => {
    unblock.current();
    retry.current();
  }, []);

  useEffect(() => {
    if (!isBlock) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unblock.current = navigator.block((tx) => {
      retry.current = tx.retry;
      toggleConfirmModal();
    });

    return () => {
      retry.current = () => undefined;
      unblock.current();
      unblock.current = () => undefined;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator, isBlock]);

  const onBeforeunload = useCallback(() => false, []);

  useEffect(() => {
    if (isBlock) {
      window.addEventListener('beforeunload', onBeforeunload);
    }

    return () => {
      window.removeEventListener('beforeunload', onBeforeunload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlock]);

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onClose={toggleConfirmModal}
    >
      <p>
        Do you want to leave page?
      </p>
      <Button onClick={confirmNavigation}>ok</Button>
    </Modal>
  );
};
