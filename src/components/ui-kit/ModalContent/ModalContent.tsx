import { ModalHeader } from 'components/ui-kit/ModalContent/ModalHeader';
import { ModalMain } from 'components/ui-kit/ModalContent/ModalMain';
import { ModalFooter } from 'components/ui-kit/ModalContent/ModalFooter';
import style from 'components/ui-kit/ModalContent/ModalContent.module.scss';

interface ChildrenProps {
  ModalHeader: typeof ModalHeader
  ModalMain: typeof ModalMain
  ModalFooter: typeof ModalFooter
}

interface Props {
  children: (props: ChildrenProps) => React.ReactNode
}

export const ModalContent = (props: Props) => {
  return (
    <div className={style.content}>
      {props.children({
        ModalHeader,
        ModalMain,
        ModalFooter,
      })}
    </div>
  );
};
