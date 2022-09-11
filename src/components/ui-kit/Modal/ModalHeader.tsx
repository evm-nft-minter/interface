import { PropsWithChildren } from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/Modal/ModalHeader.module.scss';

interface Props extends PropsWithChildren {
  className?: string
  onClickBack?: () => void
}

export const ModalHeader = (props: Props) => {
  const {
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClickBack,
  } = props;

  return (
    <div className={cn(style.header, className)}>
      {props.children}
    </div>
  );
};
