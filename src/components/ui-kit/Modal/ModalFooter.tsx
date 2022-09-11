import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/Modal/ModalFooter.module.scss';

interface Props extends PropsWithChildren {
  className?: string
}

export const ModalFooter = (props: Props) => {
  const {
    className,
  } = props;

  return (
    <div className={cn(style.footer, className)}>
      {props.children}
    </div>
  );
};
