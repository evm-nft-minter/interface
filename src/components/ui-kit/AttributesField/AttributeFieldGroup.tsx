import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { Input } from 'components/ui-kit/Filed/Filed';
import { Attribute } from 'typedefs/common';

interface Props extends Attribute {
  control: Control
  onRemove: (id: Attribute['id']) => void
}

export const AttributeFieldGroup = (props: Props) => {
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
