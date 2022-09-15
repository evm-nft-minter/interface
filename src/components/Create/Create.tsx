import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { CollectionIcon } from 'components/ui-kit/icons/CollectionIcon';
import { CollectedIcon } from 'components/ui-kit/icons/CollectedIcon';
import { ROUTES } from 'routes/routes';
import style from 'components/Create/Create.module.scss';

export const Create = () => {
  const navigation = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.cardArea}>
          <h1 className={style.title}>
            <CollectedIcon className={style.icon} />

            <span>
              Create One Item
            </span>
          </h1>

          <p className={style.text}>
            Simple way to create one NFT.
            This NFT will belongs to Community
            Collection, you will be owner of this NFT,
            can sell or transfer to other accounts.
          </p>

          <div className={style.btnWrapper}>
            <Button
              className={style.button}
              onClick={() => navigation(ROUTES.create.item)}
            >
              Create NFT
            </Button>
          </div>
        </div>

        <div className={style.line} />

        <div className={style.cardArea}>
          <h1 className={style.title}>
            <CollectionIcon className={style.icon} />

            <span>
              Create Collection
            </span>
          </h1>

          <p className={style.text}>
            Create own NFT Collection, and add first
            NFT to this Collection. This way suits if
            you want to have many NFTs and collect them
            into a single collection. You will be owner of
            this Collection, can add new NFTs, sell these NFTs
            and transfer to other accounts.
          </p>

          <div className={style.btnWrapper}>
            <Button
              className={style.button}
              onClick={() => navigation(ROUTES.create.collection)}
            >
              Create Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
