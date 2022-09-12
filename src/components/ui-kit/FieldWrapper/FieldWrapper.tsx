import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/FieldWrapper/FieldWrapper.module.scss';

interface Props extends PropsWithChildren {
  className: string
  error?: string
}

export const FiledWrapper = (props: Props) => {
  const {
    className,
    error,
  } = props;

  return (
    <div className={cn(className, style.wrapper)}>
      {props.children}

      {error && (
        <p className={cn(style.textBelow, style.error)}>
          {error}
        </p>
      )}
    </div>
  );
};
