import { Loader } from 'components/ui-kit/Loader/Loader';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { LeftButton } from 'components/WalletModal/LeftButton';
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
            <LeftButton onClick={onClickBack} />
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
