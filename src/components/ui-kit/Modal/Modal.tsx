import { memo } from 'react';
import ReactModal from 'react-modal';
import { ModalHeader } from 'components/ui-kit/Modal/ModalHeader';
import { ModalContent } from 'components/ui-kit/Modal/ModalContent';
import { ModalFooter } from 'components/ui-kit/Modal/ModalFooter';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/ui-kit/Modal/Modal.module.scss';

ReactModal.setAppElement('body');

interface ChildrenProps {
  ModalHeader: typeof ModalHeader
  ModalContent: typeof ModalContent
  ModalFooter: typeof ModalFooter
}

interface Props {
  isOpen: boolean
  onClose?: () => void
  children: (childrenProps: ChildrenProps) => React.ReactNode
}

export const Modal = memo((props: Props) => {
  const {
    isOpen,
    onClose,
  } = props;

  return (
    <ReactModal
      className={style.modal}
      overlayClassName={style.overlay}
      portalClassName={style.portal}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      {onClose && (
        <button
          className={style.closeBtn}
          onClick={onClose}
          type="button"
        >
          <CloseIcon className={style.closeIcon} />
        </button>
      )}

      {props.children({
        ModalHeader,
        ModalContent,
        ModalFooter,
      })}
    </ReactModal>
  );
});
