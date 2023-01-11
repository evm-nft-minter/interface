import { useCallback, useLayoutEffect, useState } from 'react';
import { generateAttribute, TokenAttribute } from 'packages/token';
import { AttributeFieldGroup } from 'components/ui-kit/form-elements/AttributesField/AttributeFieldGroup';
import { ModalContent } from 'components/ui-kit/ModalContent/ModalContent';
import { Modal } from 'components/ui-kit/Modal/Modal';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import style from 'components/ui-kit/form-elements/AttributesField/AddAttributesModal.module.scss';

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
    attributes: _attributes,
    onSave,
  } = props;

  const [attributes, setAttributes] = useState<TokenAttribute[]>([]);

  const addAttr = useCallback(() => {
    setAttributes((prev) => [...prev, generateAttribute()]);
  }, []);

  const removeAttr = useCallback((id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  }, []);

  const changeAttrType = useCallback((id: string, traitType: string) => {
    setAttributes((prev) => prev.map((attr) => {
      return attr.id === id ? { ...attr, traitType } : attr;
    }));
  }, []);

  const changeAttrValue = useCallback((id: string, value: string) => {
    setAttributes((prev) => prev.map((attr) => {
      return attr.id === id ? { ...attr, value } : attr;
    }));
  }, []);

  const handleSave = useCallback(() => {
    onClose();
    onSave(attributes.filter((attr) => attr.traitType && attr.value));
    setAttributes([]);
  }, [attributes, onClose, onSave]);

  const handleClose = useCallback(() => {
    onClose();
    setAttributes([]);
  }, [onClose]);

  useLayoutEffect(() => {
    if (isOpen) {
      setAttributes(_attributes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useLayoutEffect(() => {
    if (attributes.length === 0) {
      addAttr();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

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
                {attributes.map((attr) => (
                  <AttributeFieldGroup
                    key={attr.id}
                    id={attr.id}
                    traitType={attr.traitType}
                    value={attr.value}
                    onRemove={removeAttr}
                    onChangeAttrType={changeAttrType}
                    onChangeAttrValue={changeAttrValue}
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
