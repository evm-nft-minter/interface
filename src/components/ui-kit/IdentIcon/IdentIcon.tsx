import {
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import jazzicon from '@metamask/jazzicon';
import { useWallet } from 'contexts/walletCtx';

export const IdentIcon = memo(() => {
  const { account } = useWallet();

  const icon = useMemo(() => (
    account && jazzicon(16, parseInt(account.slice(2, 10), 16))
  ), [account]);

  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current } = iconRef;

    if (icon) {
      current?.appendChild(icon);

      return () => {
        current?.removeChild(icon);
      };
    }

    return () => null;
  }, [icon]);

  return (
    <span ref={iconRef} />
  );
});
