import { useCallback, useEffect } from 'react';
import { AttributeFieldGroup } from 'components/ui-kit/AttributesField/AttributeFieldGroup';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from 'components/ui-kit/Button/Button';
import { generateAttribute } from 'tools/common';
import { Attribute } from 'typedefs/common';

interface Props {
  isOpen: boolean
  onClose: () => void
  attributes: Attribute[]
  onSave: (attr: Attribute[]) => void
}

type FieldValues = Record<string, Attribute>;

export const AddAttributesModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    attributes,
    onSave,
  } = props;

  const {
    control,
    watch,
    setValue,
    getValues,
    register,
    unregister,
  } = useForm<FieldValues>();

  const values = watch();

  const addAttr = useCallback(() => {
    const newAttr = generateAttribute();

    register(newAttr.id);
    setValue(newAttr.id, newAttr);
  }, [register, setValue]);

  const removeAttr = useCallback((id: string) => {
    unregister(id);
  }, [unregister]);

  const unregisterEmptyFields = useCallback(() => {
    const _attributes = Object.values(getValues());

    _attributes.forEach((attr) => {
      if (!(attr.traitType && attr.value)) {
        unregister(attr.id);
      }
    });
  }, [getValues, unregister]);

  const handleSave = useCallback(() => {
    unregisterEmptyFields();
    onSave(Object.values(getValues()));
    onClose();
  }, [getValues, onClose, onSave, unregisterEmptyFields]);

  const handleClose = useCallback(() => {
    unregisterEmptyFields();
    onClose();
  }, [onClose, unregisterEmptyFields]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    if (attributes.length === 0) {
      addAttr();
    } else {
      attributes.forEach((attr) => {
        register(attr.id);
        setValue(attr.id, attr);
      });
    }
  }, [addAttr, attributes, isOpen, register, setValue]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      {Object.entries(values).map(([name, value]) => (
        <div key={name}>
          <AttributeFieldGroup
            {...value}
            control={control}
            onRemove={removeAttr}
          />
        </div>
      ))}

      <Button
        onClick={addAttr}
      >
        Add
      </Button>

      <Button
        onClick={handleSave}
      >
        Save
      </Button>
    </Modal>
  );
};
