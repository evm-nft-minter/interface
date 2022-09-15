import { TokenMetadataForm } from 'components/TokenMetadataForm/TokenMetadataForm';
import { useCallback } from 'react';
import { TokenMetadata } from 'packages/token';
import style from 'components/CreateItem/CreateItem.module.scss';

export const CreateItem = () => {
  const handleSubmit = useCallback((metadata: TokenMetadata) => {
    // eslint-disable-next-line no-console
    console.log(metadata);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h1 className={style.title}>
          Create New Item
        </h1>

        <div className={style.formWrapper}>
          <TokenMetadataForm
            localStorageKey="create-item-form"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
