import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/FieldWrapper/FieldWrapper.module.scss';

interface Props extends PropsWithChildren {
  error?: string
}

export const FiledWrapper = (props: Props) => {
  const { error } = props;

  return (
    <div className={style.wrapper}>
      {props.children}

      <p className={cn(style.textBelow, style.error)}>
        {error || ''}
      </p>
    </div>
  );
};
