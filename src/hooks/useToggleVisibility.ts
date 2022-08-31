import {
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface Options {
  initialVisibility?: boolean
  targetElement?: RefObject<any | null>
  localStorageKey?: string
}

export const useToggleVisibility = (options?: Options) => {
  const {
    initialVisibility = false,
    targetElement,
    localStorageKey,
  } = options || {};

  /* eslint-disable react-hooks/rules-of-hooks */
  const [isVisible, setIsVisible] = localStorageKey
    ? useLocalStorage(localStorageKey, initialVisibility)
    : useState(initialVisibility);
  /* eslint-enable react-hooks/rules-of-hooks */

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, [setIsVisible]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!isVisible || !targetElement?.current) {
        return;
      }

      const wasClickInner = targetElement.current.contains(event.target);

      if (wasClickInner) {
        return;
      }

      setIsVisible(false);
    };

    if (targetElement) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => window.removeEventListener('click', handleClickOutside);
  }, [isVisible, targetElement, setIsVisible]);

  return [isVisible, toggleVisibility] as const;
};
