import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { Field } from 'components/ui-kit/Filed/Filed';
import { TokenAttribute } from 'packages/token';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import { FieldValues } from 'components/ui-kit/AttributesField/attributesField.typedefs';
import style from 'components/ui-kit/AttributesField/AttributeFieldGroup.module.scss';

interface Props extends TokenAttribute {
  control: Control<FieldValues>
  index: number
  onRemove: (index: number) => void
}

export const AttributeFieldGroup = (props: Props) => {
  const {
    control,
    index,
    onRemove,
  } = props;

  const handleRemove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  return (
    <div className={style.filedGroup}>
      <Field
        name={`attributes.${index}.traitType`}
        control={control}
        placeholder="Power name"
      />

      <Field
        name={`attributes.${index}.value`}
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
