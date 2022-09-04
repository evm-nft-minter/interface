import {
  useState,
  useCallback,
  ChangeEvent,
  MouseEvent,
} from 'react';
import cn from 'classnames';
import { ImageIcon } from 'components/ui-kit/icons/ImageIcon';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import style from 'components/CreateItemForm/FileInput.module.scss';

export const FileInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [arrayBuffer, setArrayBuffer] = useState<number[] | null>(null);

  const handleChange = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    setImageUrl(URL.createObjectURL(file));

    file.arrayBuffer().then((arr) => {
      setArrayBuffer(Array.from(new Uint8Array(arr)));
    });
  }, []);

  const handleRemove = useCallback((
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.stopPropagation();

    setImageUrl(null);
    setArrayBuffer(null);
    setInputValue('');
  }, []);

  return (
    <label className={style.label}>
      <input
        value={inputValue}
        className={style.input}
        onChange={handleChange}
        type="file"
        accept="image/*"
      />

      <button
        className={style.removeBtn}
        onClick={handleRemove}
        hidden={!imageUrl}
      >
        <CloseIcon className={style.closeIcon} />
      </button>

      {imageUrl && (
        <img
          className={style.img}
          src={imageUrl}
          alt="nft file"
        />
      )}

      <div
        className={cn(style.background, {
          [style.hidden]: imageUrl,
        })}
      >
        <ImageIcon className={style.imgIcon} />
      </div>
    </label>
  );
};
