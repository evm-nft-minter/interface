import { Button } from 'components/ui-kit/buttons/Button/Button';
import { IdentIcon } from 'components/ui-kit/IdentIcon/IdentIcon';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { getWalletName, WalletEnum } from 'packages/wallets';
import { sliceStringFromTo } from 'packages/tools';
import { CopyButton } from 'components/ui-kit/buttons/CopyButton/CopyButton';
import style from 'components/WalletModal/ConnectedModalContent.module.scss';

interface Props {
  account: string
  wallet: WalletEnum
  onDisconnect: () => void
}

export const ConnectedModalContent = (props: Props) => {
  const {
    account,
    wallet,
    onDisconnect,
  } = props;

  return (
    <ModalContent>
      {({ ModalHeader, ModalMain }) => (
        <>
          <ModalHeader>
            <h1>Account</h1>
          </ModalHeader>

          <ModalMain className={style.main}>
            <div className={style.borderContainer}>
              <div className={style.row}>
                <p className={style.wallet}>
                  {`Connected with ${getWalletName(wallet)}`}
                </p>

                <Button
                  onClick={onDisconnect}
                  mode={Button.mode.BORDER}
                >
                  Disconnect
                </Button>
              </div>

              <div className={style.accountContainer}>
                <IdentIcon
                  address={account}
                  diameter={16}
                />

                <p className={style.account}>
                  {sliceStringFromTo(account, 6, -4)}
                </p>
              </div>

              <CopyButton target={account}>
                Copy Address
              </CopyButton>
            </div>
          </ModalMain>
        </>
      )}
    </ModalContent>
  );
};
