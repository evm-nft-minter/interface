import { useCallback, useState } from 'react';

interface Options {
  initialValue?: boolean
}

export const useModalState = (options?: Options) => {
  const {
    initialValue = false,
  } = options || {};

  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, open, close] as const;
};
