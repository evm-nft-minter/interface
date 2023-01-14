import {
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Options {
  initialValue?: boolean
  targetElement?: RefObject<any | null>
  localStorageKey?: string
}

export const useVisibilityState = (options?: Options) => {
  const {
    initialValue = false,
    targetElement,
  } = options || {};

  const [isVisible, setIsVisible] = useState(initialValue);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hidden = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!(isVisible && targetElement?.current)) {
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
  }, [isVisible, targetElement]);

  return [isVisible, show, hidden] as const;
};
