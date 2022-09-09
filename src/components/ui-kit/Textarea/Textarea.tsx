import cn from 'classnames';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import style from 'components/ui-kit/Textarea/Textarea.module.scss';

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  placeholder?: string
  disabled?: boolean
  id?: string
}

export const Textarea = <T extends FieldValues>(props: Props<T>) => {
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
    <div className={style.wrapper}>
      <textarea
        {...field}
        value={field.value || ''}
        className={cn(style.textarea, { [style.error]: error })}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        id={id}
      />

      {error && (
        <p className={cn(style.textBelow, style.error)}>
          {error.message}
        </p>
      )}
    </div>
  );
};
