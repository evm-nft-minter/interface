import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { generateAttribute, TokenAttribute } from 'packages/token';
import { FieldValues } from 'components/ui-kit/AttributesField/attributesField.typedefs';

export const useAttributesFields = () => {
  const {
    control,
    setValue,
    getValues,
  } = useForm<FieldValues>();

  const {
    fields,
    append: _append,
    remove: _remove,
  } = useFieldArray({
    control,
    name: 'attributes',
    keyName: 'key',
  });

  const append = useCallback(() => {
    _append(generateAttribute());
  }, [_append]);

  const remove = useCallback((index: number) => {
    if (index === 0) {
      setValue('attributes.0', generateAttribute());
    } else {
      _remove(index);
    }
  }, [setValue, _remove]);

  const removeEmpty = useCallback(() => {
    const _attributes = getValues().attributes;
    const empty = Object.entries(_attributes)
      .filter(([_, attr]) => !(attr.traitType && attr.value))
      .map(([index]) => Number(index));

    _remove(empty);
  }, [getValues, _remove]);

  const initialize = useCallback((attributes: TokenAttribute[]) => {
    if (attributes.length === 0) {
      append();
    } else {
      _append(attributes);
    }
  }, [append, _append]);

  const reset = useCallback(() => {
    _remove();
  }, [_remove]);

  return {
    control,
    fields,
    getValues,
    append,
    remove,
    removeEmpty,
    initialize,
    reset,
  };
};
