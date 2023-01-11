import { forwardRef } from 'react';
import { TokenAttribute } from 'packages/token';
import { useModal } from 'hooks/useModal';
import { AddAttributesModal } from 'components/ui-kit/AttributesField/AddAttributesModal';
import { PlusIcon } from 'components/ui-kit/icons/PlusIcon';
import style from 'components/ui-kit/AttributesField/AttributesField.module.scss';

interface Props {
  attributes?: TokenAttribute[] | null
  onChange: (attributes: TokenAttribute[] | undefined | null) => void
}

export const AttributesField = forwardRef((props: Props, ref: any) => {
  const {
    attributes: _attributes,
    onChange,
  } = props;

  const attributes = _attributes || [];

  const [isFieldModalOpen, toggleFieldModal] = useModal();

  return (
    <div ref={ref} className={style.field}>
      <button
        className={style.addBtn}
        type="button"
        onClick={toggleFieldModal}
      >
        <PlusIcon />
      </button>

      <AddAttributesModal
        isOpen={isFieldModalOpen}
        onClose={toggleFieldModal}
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
});
