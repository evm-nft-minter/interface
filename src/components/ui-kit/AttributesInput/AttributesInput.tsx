import {
  FieldPath,
  Control,
  useController,
  FieldValues,
} from 'react-hook-form';
import { useModal } from 'hooks/useModal';
import { Attribute } from 'typedefs/common';
import { AddAttributesModal } from 'components/ui-kit/AttributesInput/AddAttributesModal';
import { PlusIcon } from 'components/ui-kit/icons/PlusIcon';
import style from 'components/ui-kit/AttributesInput/AttributesInput.module.scss';

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
}

export const AttributesInput = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    control,
  } = props;

  const {
    field: {
      onChange,
      ...field
    },
  } = useController<T>({
    name,
    control,
  });

  const attributes = field.value || [] as Attribute[];

  const [isOpen, toggleIsOpen] = useModal();

  return (
    <div className={style.attributes}>
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
  );
};

  // <label htmlFor="add-attr-btn" className={style.input}>
  //   label click
  //   <button type="button">
  //     click
  //   </button>
  // </label>

  // <button id="add-attr-btn" type="button" onClick={console.log}>
  //   click
  // </button>
