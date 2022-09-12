import { useCallback, useEffect } from 'react';
import { AttributeFieldGroup } from 'components/ui-kit/AttributesField/AttributeFieldGroup';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from 'components/ui-kit/Button/Button';
import { generateAttribute } from 'tools/common';
import { Attribute } from 'typedefs/common';
import style from 'components/ui-kit/AttributesField/AddAttributesModal.module.scss';

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

    const _attributes = Object.values(getValues());

    if (_attributes.length === 0) {
      addAttr();
    }
  }, [unregister, getValues, addAttr]);

  const initializeFields = useCallback(() => {
    if (attributes.length === 0) {
      addAttr();
    } else {
      attributes.forEach((attr) => {
        register(attr.id);
        setValue(attr.id, attr);
      });
    }
  }, [attributes, addAttr, register, setValue]);

  const unregisterEmptyFields = useCallback(() => {
    const _attributes = Object.values(getValues());

    _attributes.forEach((attr) => {
      if (!(attr.traitType && attr.value)) {
        unregister(attr.id);
      }
    });
  }, [getValues, unregister]);

  const unregisterAllFields = useCallback(() => {
    const _attributes = Object.values(getValues());

    _attributes.forEach((attr) => {
      unregister(attr.id);
    });
  }, [getValues, unregister]);

  const handleSave = useCallback(() => {
    unregisterEmptyFields();
    onSave(Object.values(getValues()));
    unregisterAllFields();
    onClose();
  }, [getValues, onClose, onSave, unregisterAllFields, unregisterEmptyFields]);

  const handleClose = useCallback(() => {
    unregisterAllFields();
    onClose();
  }, [onClose, unregisterAllFields]);

  useEffect(() => {
    if (isOpen) {
      initializeFields();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      {({ ModalHeader, ModalContent, ModalFooter }) => (
        <>
          <ModalHeader className={style.header}>
            <h2>Attributes</h2>
          </ModalHeader>

          <ModalContent className={style.content}>
            <div className={style.fieldsName}>
              <p className={style.name}>Name</p>
              <p className={style.name}>Vale</p>
            </div>

            <div className={style.fieldsWrapper}>
              {Object.entries(values).map(([name, value]) => (
                <AttributeFieldGroup
                  key={name}
                  {...value}
                  control={control}
                  onRemove={removeAttr}
                />
              ))}
            </div>

            <Button
              className={style.addBtn}
              onClick={addAttr}
              mode={Button.mode.SECONDARY}
            >
              Add More
            </Button>
          </ModalContent>

          <ModalFooter className={style.footer}>
            <Button
              className={style.saveBtn}
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};
