import { LeftArrowIcon } from 'components/ui-kit/icons/LeftArrowIcon';
import { Loader } from 'components/ui-kit/Loader/Loader';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import style from 'components/WalletModal/ConnectingModalContent.module.scss';

interface Props {
  onClickBack: () => void
}

export const ConnectingModalContent = (props: Props) => {
  const {
    onClickBack,
  } = props;

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <button
              className={style.backBtn}
              onClick={onClickBack}
            >
              <LeftArrowIcon className={style.backIcon} />
            </button>
          </ModalHeader>

          <ModalMain className={style.main}>
            <Loader loading />

            <h1 className={style.title}>
              Connecting...
            </h1>
          </ModalMain>
        </>
        )}
    </ModalContent>
  );
};
