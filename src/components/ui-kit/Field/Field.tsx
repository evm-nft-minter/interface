import { forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/Field/Field.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: any
}

export const Field = forwardRef((props: Props, ref: any) => {
  const {
    error,
    ...attributes
  } = props;

  return (
    <input
      {...attributes}
      ref={ref}
      className={cn(style.field, { [style.error]: error })}
      autoComplete="off"
    />
  );
});
