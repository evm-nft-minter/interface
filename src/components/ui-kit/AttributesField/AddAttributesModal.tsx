import { useCallback, useEffect } from 'react';
import { AttributeFieldGroup } from 'components/ui-kit/AttributesField/AttributeFieldGroup';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { TokenAttribute, generateAttribute } from 'packages/token';
import style from 'components/ui-kit/AttributesField/AddAttributesModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
  attributes: TokenAttribute[]
  onSave: (attr: TokenAttribute[]) => void
}

type FieldValues = Record<string, TokenAttribute>;

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

  const values = watch();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalContent>
        {({ ModalHeader, ModalMain, ModalFooter }) => (
          <>
            <ModalHeader className={style.header}>
              <h2>Attributes</h2>
            </ModalHeader>

            <ModalMain className={style.main}>
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
            </ModalMain>

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
      </ModalContent>
    </Modal>
  );
};
