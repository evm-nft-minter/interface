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

export const Field = <T extends FieldValues>(props: Props<T>) => {
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
        className={cn(style.field, { [style.error]: error })}
        value={field.value || ''}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        autoComplete="off"
      />
    </FiledWrapper>
  );
};
