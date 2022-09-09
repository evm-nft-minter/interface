import {
  useState,
  useCallback,
  ChangeEvent,
  MouseEvent,
  DragEvent,
  useMemo,
} from 'react';
import cn from 'classnames';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import * as yup from 'yup';
import { ImageIcon } from 'components/ui-kit/icons/ImageIcon';
import { CloseIcon } from 'components/ui-kit/icons/CloseIcon';
import { FiledWrapper } from 'components/ui-kit/FieldWrapper/FieldWrapper';
import style from 'components/ui-kit/ImageField/ImageField.module.scss';

const schema = yup
  .mixed()
  .test((file: File) => file?.type.startsWith('image/'));

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  id?: string
}

export const ImageInput = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    control,
    id,
  } = props;

  const {
    field: {
      onChange,
      value,
      ref,
      ...filed
    },
    fieldState,
  } = useController<T>({
    name,
    control,
  });

  const [invalidFileType, setInvalidFileType] = useState<boolean>(false);

  const imageUrl = useMemo(() => {
    return value ? URL.createObjectURL(value) : null;
  }, [value]);

  const handelChangeFile = useCallback(async (file: File) => {
    try {
      setInvalidFileType(false);

      await schema.validate(file);

      onChange(file);
    } catch (e) {
      setInvalidFileType(true);
    }
  }, [onChange]);

  const handleChange = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      handelChangeFile(event.target.files[0]);
    }
  }, [handelChangeFile]);

  const handleDrop = useCallback((event: DragEvent<any>) => {
    event.preventDefault();
    handelChangeFile(event.dataTransfer.files[0]);
  }, [handelChangeFile]);

  const handleDragOver = useCallback((event: DragEvent<any>) => {
    event.preventDefault();
  }, []);

  const handleRemove = useCallback((event: MouseEvent<any>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  const error = fieldState.error?.message || (
    invalidFileType ? 'Invalid file type' : undefined
  );

  return (
    <FiledWrapper
      className={style.wrapper}
      error={error}
    >
      <label
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={ref}
        className={cn(style.label, { [style.error]: error || invalidFileType })}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          {...filed}
          className={style.filed}
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
    </FiledWrapper>
  );
};
