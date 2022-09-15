import {
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Options {
  initialVisibility?: boolean
  targetElement?: RefObject<any | null>
  localStorageKey?: string
}

export const useToggleVisibility = (options?: Options) => {
  const {
    initialVisibility = false,
    targetElement,
  } = options || {};

  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
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

  return [isVisible, toggleVisibility] as const;
};
