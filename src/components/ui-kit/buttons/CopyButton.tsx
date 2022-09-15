import {
  FC,
  useCallback,
  useState,
  memo,
  PropsWithChildren,
  useEffect,
} from 'react';
import cn from 'classnames';
import { CopyIcon } from 'components/ui-kit/icons/CopyIcon';
import { CheckIcon } from 'components/ui-kit/icons/CheckIcon';
import style from 'components/ui-kit/buttons/CopyButton.module.scss';

interface Props extends PropsWithChildren {
  target: string
}

export const CopyButton: FC<Props> = memo((props) => {
  const { target } = props;

  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(target);
    setIsCopied(true);
  }, [target]);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);

  return (
    <button
      className={cn(style.button, { [style.copied]: isCopied })}
      onClick={copy}
    >
      {isCopied ? (
        <>
          <CheckIcon className={cn(style.checkIcon, style.icon)} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <CopyIcon className={style.icon} />
          <span>{props.children}</span>
        </>
      )}
    </button>
  );
});
