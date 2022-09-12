import {
  FieldPath,
  Control,
  useController,
  FieldValues,
} from 'react-hook-form';
import { useModal } from 'hooks/useModal';
import { Attribute } from 'typedefs/common';
import { AddAttributesModal } from 'components/ui-kit/AttributesField/AddAttributesModal';
import { PlusIcon } from 'components/ui-kit/icons/PlusIcon';
import { FiledWrapper } from 'components/ui-kit/FieldWrapper/FieldWrapper';
import style from 'components/ui-kit/AttributesField/AttributesField.module.scss';

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
}

export const AttributesField = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    control,
  } = props;

  const {
    field: {
      onChange,
      ...field
    },
    fieldState: {
      error,
    },
  } = useController<T>({
    name,
    control,
  });

  const attributes = field.value || [] as Attribute[];

  const [isOpen, toggleIsOpen] = useModal();

  return (
    <FiledWrapper
      className={style.wrapper}
      error={error?.message}
    >
      <div className={style.field}>
        <button
          className={style.addBtn}
          type="button"
          onClick={toggleIsOpen}
        >
          <PlusIcon />
        </button>

        <AddAttributesModal
          isOpen={isOpen}
          onClose={toggleIsOpen}
          attributes={attributes}
          onSave={onChange}
        />

        {attributes.map((attr) => (
          <div key={attr.id} className={style.attribute}>
            <p className={style.name}>
              {attr.traitType}
            </p>

            <p className={style.value}>
              {attr.value}
            </p>
          </div>
        ))}
      </div>
    </FiledWrapper>
  );
};
