import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { Field } from 'components/ui-kit/Filed/Filed';
import { Attribute } from 'typedefs/common';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/ui-kit/AttributesField/AttributeFieldGroup.module.scss';

interface Props extends Attribute {
  control: Control
  onRemove: (id: Attribute['id']) => void
}

export const AttributeFieldGroup = (props: Props) => {
  const {
    id,
    control,
    onRemove,
  } = props;

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <div className={style.filedGroup}>
      <Field
        name={`${id}.traitType`}
        control={control}
        placeholder="Power name"
      />

      <Field
        name={`${id}.value`}
        control={control}
        placeholder="Power"
      />

      <div className={style.btnWrapper}>
        <button
          className={style.removeBtn}
          onClick={handleRemove}
          type="button"
        >
          <CloseIcon className={style.closeIcon} />
        </button>
      </div>
    </div>
  );
};
