import { ChangeEvent, useCallback } from 'react';
import { TokenAttribute } from 'packages/token';
import { Field } from 'components/ui-kit/Filed/Filed';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/ui-kit/AttributesField/AttributeFieldGroup.module.scss';

interface Props extends TokenAttribute {
  onRemove: (id: string) => void
  onChangeAttrType: (id: string, type: string) => void
  onChangeAttrValue: (id: string, value: string) => void
}

export const AttributeFieldGroup = (props: Props) => {
  const {
    onRemove,
    onChangeAttrType,
    onChangeAttrValue,
    id,
    traitType,
    value,
  } = props;

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  const handleChangeAttrType = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeAttrType(id, event.target.value);
  }, [id, onChangeAttrType]);

  const handleChangeAttrValue = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeAttrValue(id, event.target.value);
  }, [id, onChangeAttrValue]);

  return (
    <div className={style.filedGroup}>
      <Field
        value={traitType}
        placeholder="Power name"
        onChange={handleChangeAttrType}
      />

      <Field
        value={value}
        placeholder="Power"
        onChange={handleChangeAttrValue}
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
