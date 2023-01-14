import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(key: string, initial?: T) => {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initial;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      return initial;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;

        window.localStorage.setItem(key, JSON.stringify(next));

        return next;
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [stored, setValue] as const;
};
