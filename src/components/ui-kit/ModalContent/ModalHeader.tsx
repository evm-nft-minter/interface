import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/ModalContent/ModalHeader.module.scss';

interface Props extends PropsWithChildren {
  className?: string
}

export const ModalHeader = (props: Props) => {
  const {
    className,
  } = props;

  return (
    <div className={cn(style.header, className)}>
      {props.children}
    </div>
  );
};
