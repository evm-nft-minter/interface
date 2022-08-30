import {
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import jazzicon from '@metamask/jazzicon';
import style from 'components/ui-kit/IdentIcon/IdentIcon.module.scss';

interface Props {
  diameter: number
  address: string
}

export const IdentIcon = memo((props: Props) => {
  const {
    diameter,
    address,
  } = props;

  const icon = useMemo(() => (
    address && jazzicon(diameter, parseInt(address.slice(2, 10), 16))
  ), [address, diameter]);

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
    <div
      style={{
        width: diameter,
        height: diameter,
      }}
      className={style.icon}
      ref={iconRef}
    />
  );
});
