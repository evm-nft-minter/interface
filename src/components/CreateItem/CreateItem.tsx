import { TokenMetadataForm } from 'components/TokenMetadataForm/TokenMetadataForm';
import { useCallback } from 'react';
import { TokenMetadata } from 'packages/token';
import { WalletButton } from 'components/ui-kit/buttons/WalletButton/WalletButton';
import { useWallet } from 'contexts/walletCtx';
import { BackButton } from 'components/ui-kit/buttons/BackButton/BackButton';
import { ROUTES } from 'routes/routes';
import style from 'components/CreateItem/CreateItem.module.scss';

export const CreateItem = () => {
  const {
    account,
  } = useWallet();

  const handleSubmit = useCallback((metadata: TokenMetadata) => {
    // eslint-disable-next-line no-console
    console.log(metadata);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <header className={style.header}>
          <BackButton to={ROUTES.create.index} />

          <h1 className={style.title}>
            Create New Item
          </h1>
        </header>

        <div className={style.formWrapper}>
          <TokenMetadataForm
            localStorageKey="create-item-form"
            onSubmit={handleSubmit}
            submitButton={!account && <WalletButton />}
          />
        </div>
      </div>
    </div>
  );
};
