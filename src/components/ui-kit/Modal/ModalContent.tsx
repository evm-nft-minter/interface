import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/Modal/ModalContent.module.scss';

interface Props extends PropsWithChildren {
  className?: string
}

export const ModalContent = (props: Props) => {
  const {
    className,
  } = props;

  return (
    <div className={cn(style.content, className)}>
      {props.children}
    </div>
  );
};
