import cn from 'classnames';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { FiledWrapper } from 'components/ui-kit/FieldWrapper/FieldWrapper';
import style from 'components/ui-kit/Filed/Filed.module.scss';

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  placeholder?: string
  disabled?: boolean
  id?: string
}

export const Input = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    control,
    placeholder,
    disabled,
    id,
  } = props;

  const {
    field,
    fieldState: {
      error,
    },
  } = useController<T>({
    name,
    control,
  });

  return (
    <FiledWrapper
      className={style.wrapper}
      error={error?.message}
    >
      <input
        {...field}
        value={field.value || ''}
        className={cn(style.field, { [style.error]: error })}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        id={id}
      />
    </FiledWrapper>
  );
};
