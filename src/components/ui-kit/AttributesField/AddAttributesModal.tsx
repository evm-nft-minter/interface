import { useCallback, useLayoutEffect } from 'react';
import { AttributeFieldGroup } from 'components/ui-kit/AttributesField/AttributeFieldGroup';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { TokenAttribute } from 'packages/token';
import { useAttributesFields } from 'components/ui-kit/AttributesField/hooks/useAttributesFields';
import style from 'components/ui-kit/AttributesField/AddAttributesModal.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
  attributes: TokenAttribute[]
  onSave: (attr: TokenAttribute[]) => void
}

export const AddAttributesModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    attributes,
    onSave,
  } = props;

  const {
    control,
    fields,
    getValues,
    append,
    remove,
    removeEmpty,
    initialize,
    reset,
  } = useAttributesFields();

  const handleSave = useCallback(() => {
    onClose();
    removeEmpty();
    onSave(getValues().attributes);
    reset();
  }, [getValues, onClose, onSave, removeEmpty, reset]);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  useLayoutEffect(() => {
    if (isOpen) {
      initialize(attributes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
                {fields.map(({ key, traitType, value }, index) => (
                  <AttributeFieldGroup
                    key={key}
                    traitType={traitType}
                    value={value}
                    index={index}
                    control={control}
                    onRemove={remove}
                  />
                ))}
              </div>

              <Button
                className={style.addBtn}
                onClick={append}
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
