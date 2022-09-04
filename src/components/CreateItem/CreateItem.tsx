import { CreateItemForm } from 'components/CreateItemForm/CreateItemForm';
import style from 'components/CreateItem/CreateItem.module.scss';

export const CreateItem = () => {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <h1>
          Create Item
        </h1>

        <CreateItemForm />
      </div>
    </div>
  );
};
