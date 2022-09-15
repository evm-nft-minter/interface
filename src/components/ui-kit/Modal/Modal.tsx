import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/ui-kit/Modal/Modal.module.scss';

ReactModal.setAppElement('body');

interface Props extends PropsWithChildren {
  isOpen: boolean
  onClose?: () => void
}

export const Modal = (props: Props) => {
  const {
    isOpen,
    onClose,
  } = props;

  return (
    <ReactModal
      className={style.modal}
      overlayClassName={style.overlay}
      portalClassName={style.portal}
      bodyOpenClassName={style.bodyOpen}
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

      {props.children}
    </ReactModal>
  );
};
