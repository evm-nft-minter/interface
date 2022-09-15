import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/ModalContent/ModalMain.module.scss';

interface Props extends PropsWithChildren {
  className?: string
}

export const ModalMain = (props: Props) => {
  const {
    className,
  } = props;

  return (
    <div className={cn(style.content, className)}>
      {props.children}
    </div>
  );
};
