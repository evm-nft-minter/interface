import { memo } from 'react';
import { LoaderIcon } from 'components/ui-kit/icons/LoaderIcon';
import style from 'components/ui-kit/Loader/Loader.module.scss';

interface Props {
  size?: string
  loading: boolean
}

export const Loader = memo((props: Props) => {
  const {
    size = 32,
    loading,
  } = props;

  return (
    <div hidden={!loading}>
      <LoaderIcon
        className={style.loader}
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
});
