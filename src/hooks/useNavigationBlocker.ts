import {
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

interface Options {
  initialValue?: boolean
  onTryWhenBlocked?: () => void
}

let _retry = () => undefined;
let _unblock = () => undefined;

export const useNavigationBlocker = (options?: Options) => {
  const {
    initialValue = false,
    onTryWhenBlocked,
  } = options || {};

  const { navigator } = useContext(NavigationContext);

  const [isBlock, setIsBlock] = useState(initialValue);

  const block = useCallback(() => setIsBlock(true), []);
  const unblock = useCallback(() => setIsBlock(false), []);

  const forceLastNavigation = useCallback(() => {
    _unblock();
    _retry();
  }, []);

  useEffect(() => {
    if (!isBlock) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _unblock = navigator.block((tx) => {
      _retry = tx.retry;

      if (onTryWhenBlocked) {
        onTryWhenBlocked();
      }
    });

    return () => {
      _retry = () => undefined;
      _unblock();
      _unblock = () => undefined;
    };
  }, [navigator, isBlock, onTryWhenBlocked]);

  useEffect(() => {
    const handleBeforeunload = () => false;

    if (isBlock) {
      window.addEventListener('beforeunload', handleBeforeunload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [isBlock]);

  return {
    block,
    unblock,
    forceLastNavigation,
  };
};
