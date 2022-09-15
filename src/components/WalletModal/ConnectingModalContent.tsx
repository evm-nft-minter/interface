import { BackButton } from 'components/ui-kit/buttons/BackButton';
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
            <BackButton onClick={onClickBack} />
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
