import { forwardRef, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/TextField/TextField.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: any
}

export const TextField = forwardRef((props: Props, ref: any) => {
  const {
    error,
    ...attributes
  } = props;

  return (
    <textarea
      {...attributes}
      ref={ref}
      className={cn(style.field, { [style.error]: error })}
      autoComplete="off"
    />
  );
});
