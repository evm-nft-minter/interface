import { memo, PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import style from 'components/ui-kit/Modal/Modal.module.scss';

ReactModal.setAppElement('body');

interface Props extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

export const Modal = memo((props: Props) => {
  const {
    isOpen,
    onClose,
  } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      portalClassName={style.portal}
    >
      <div className={style.modal}>
        {props.children}
      </div>
    </ReactModal>
  );
});
