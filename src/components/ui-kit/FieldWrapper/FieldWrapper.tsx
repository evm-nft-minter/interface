import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/FieldWrapper/FieldWrapper.module.scss';

interface Props extends PropsWithChildren {
  error?: string
  textBelow?: string
}

export const FiledWrapper = (props: Props) => {
  const {
    error,
    textBelow,
  } = props;

  return (
    <div className={style.wrapper}>
      {props.children}

      <p className={cn(style.textBelow, { [style.error]: error })}>
        {error && error}
        {!error && textBelow && textBelow}
      </p>
    </div>
  );
};
