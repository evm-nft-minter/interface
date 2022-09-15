import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Field } from 'components/ui-kit/Filed/Filed';
import { Button } from 'components/ui-kit/buttons/Button/Button';
import { TextFiled } from 'components/ui-kit/TextFiled/TextFiled';
import { Label } from 'components/ui-kit/Label/Label';
import { ImageFiled } from 'components/ui-kit/ImageField/ImageField';
import { AttributesField } from 'components/ui-kit/AttributesField/AttributesField';
import { TokenMetadata } from 'packages/token';
import {
  setFileToLS,
  getFileFromLS,
  getItemFromLS,
  setItemToLS,
} from 'packages/localStorage';
import style from 'components/TokenMetadataForm/TokenMetadataForm.module.scss';

type FieldValues = Nullable<TokenMetadata>;

const schema = yup.object({
  image: yup
    .mixed()
    .nullable()
    .required('Image is required'),
  name: yup
    .string()
    .nullable()
    .transform((value) => value || null),
  description: yup
    .string()
    .nullable()
    .transform((value) => value || null),
  attributes: yup
    .mixed()
    .nullable()
    .transform((value) => (
      (value && value.length > 0) ? value : null
    )),
}).required();

interface Props {
  localStorageKey: string
  onSubmit: (metadata: TokenMetadata) => void
}

export const TokenMetadataForm = (props: Props) => {
  const {
    localStorageKey,
    onSubmit,
  } = props;

  const defaultValues = useMemo(() => {
    const item = getItemFromLS<FieldValues>(localStorageKey);
    const image = getFileFromLS(`${localStorageKey}.image`);

    return {
      image,
      name: item?.name || null,
      description: item?.description || null,
      attributes: item?.attributes || null,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    control,
    getValues,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit = useCallback((fieldValues: FieldValues) => {
    const checkImage = (values: FieldValues): values is TokenMetadata => (
      Boolean(values.image)
    );

    if (checkImage(fieldValues)) {
      onSubmit(fieldValues);
    }
  }, [onSubmit]);

  useEffect(() => {
    const setStateToLS = () => {
      const {
        image,
        ...value
      } = getValues();

      setItemToLS(localStorageKey, value);
      setFileToLS(`${localStorageKey}.image`, image);
    };

    window.addEventListener('beforeunload', setStateToLS);

    return setStateToLS;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(submit)}
    >
      <Label
        title="Image of your item"
        htmlFor="image"
      >
        <ImageFiled
          name="image"
          control={control}
          id="image"
        />
      </Label>

      <Label
        title="Name"
        htmlFor="name"
        optional
      >
        <Field
          name="name"
          control={control}
          id="name"
          placeholder="Item name"
        />
      </Label>

      <Label
        title="Description"
        htmlFor="description"
        optional
      >
        <TextFiled
          name="description"
          control={control}
          id="description"
          placeholder="Item description"
        />
      </Label>

      <Label title="Item Attributes">
        <AttributesField
          name="attributes"
          control={control}
        />
      </Label>

      <Button
        className={style.submitBtn}
        type="submit"
      >
        Next
      </Button>
    </form>
  );
};
