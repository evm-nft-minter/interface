import {
  useCallback,
  ChangeEvent,
  MouseEvent,
  DragEvent,
  useMemo,
  forwardRef,
} from 'react';
import cn from 'classnames';
import { ImageIcon } from 'components/ui-kit/icons/ImageIcon';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/ui-kit/ImageField/ImageField.module.scss';

interface Props {
  id?: string
  value?: File | null
  error?: any
  onChange: (value: File | null | undefined) => void
}

export const ImageField = forwardRef((props: Props, ref: any) => {
  const {
    id,
    value,
    error,
    onChange,
  } = props;

  const imageUrl = useMemo(() => {
    return value ? URL.createObjectURL(value) : null;
  }, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.files && event.target.files[0]);
  }, [onChange]);

  const handleDrop = useCallback((event: DragEvent<any>) => {
    event.preventDefault();
    onChange(event.dataTransfer.files[0]);
  }, [onChange]);

  const handleDragOver = useCallback((event: DragEvent<any>) => {
    event.preventDefault();
  }, []);

  const handleRemove = useCallback((event: MouseEvent<any>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  return (
    <label
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={ref}
      className={cn(style.label, { [style.error]: error })}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        className={style.field}
        onChange={handleChange}
        value=""
        type="file"
        accept="image/*"
        id={id}
      />

      <button
        className={style.removeBtn}
        onClick={handleRemove}
        hidden={!imageUrl}
        type="button"
      >
        <CloseIcon className={style.closeIcon} />
      </button>

      {imageUrl && (
        <img
          className={style.img}
          src={imageUrl}
          alt="preview image"
        />
      )}

      <div className={cn(style.background, { [style.hidden]: imageUrl })}>
        <ImageIcon className={style.imgIcon} />
      </div>
    </label>
  );
});
