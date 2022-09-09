import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { Input } from 'components/ui-kit/Input/Input';
import { Attribute } from 'typedefs/common';

interface Props extends Attribute {
  control: Control
  onRemove: (id: Attribute['id']) => void
}

export const AttributeInputGroupe = (props: Props) => {
  const {
    id,
    control,
    onRemove,
  } = props;

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <div>
      <button onClick={handleRemove}>
        remove
      </button>

      <Input
        name={`${id}.value`}
        control={control}
      />

      <Input
        name={`${id}.traitType`}
        control={control}
      />
    </div>
  );
};
