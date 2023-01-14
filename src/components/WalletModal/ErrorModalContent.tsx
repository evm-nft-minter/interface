import { WalletEnum } from 'packages/wallets';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { LeftButton } from 'components/WalletModal/LeftButton';
import style from 'components/WalletModal/ErrorModalContent.module.scss';

interface Props {
  wallet: WalletEnum
  onTryAgain: (wallet: WalletEnum) => void
  onClickBack: () => void
}

export const ErrorModalContent = (props: Props) => {
  const {
    wallet,
    onTryAgain,
    onClickBack,
  } = props;

  const handleTryAgain = () => {
    onTryAgain(wallet);
  };

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <LeftButton onClick={onClickBack} />
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
