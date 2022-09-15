import { ProviderEnum } from 'packages/providers';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import style from 'components/WalletModal/ErrorModalContent.module.scss';
import { BackButton } from 'components/ui-kit/buttons/BackButton';

interface Props {
  provider: ProviderEnum | null
  onTryAgain: (provider: ProviderEnum) => void
  onClickBack: () => void
}

export const ErrorModalContent = (props: Props) => {
  const {
    provider,
    onTryAgain,
    onClickBack,
  } = props;

  const handleTryAgain = () => {
    if (provider) {
      onTryAgain(provider);
    }
  };

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <BackButton onClick={onClickBack} />
          </ModalHeader>

          <ModalMain className={style.main}>
            <h1 className={style.title}>
              Error connecting
            </h1>

            <p className={style.text}>
              The connection attempt failed.
              Please click try again and follow
              the steps to connect in your wallet.
            </p>

            <Button onClick={handleTryAgain}>
              Try Again
            </Button>

            <button
              className={style.backToWalletBtn}
              onClick={onClickBack}
            >
              Back to wallet section
            </button>
          </ModalMain>
        </>
        )}
    </ModalContent>
  );
};
