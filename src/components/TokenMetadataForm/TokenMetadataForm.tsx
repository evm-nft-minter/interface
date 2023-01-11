import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TokenMetadata } from 'packages/token';
import {
  setFileToLS,
  getFileFromLS,
  getItemFromLS,
  setItemToLS,
} from 'packages/localStorage';

import style from 'components/TokenMetadataForm/TokenMetadataForm.module.scss';

import { Button } from 'components/ui-kit/buttons/Button/Button';
import { Field } from 'components/ui-kit/Field/Field';
import { TextField } from 'components/ui-kit/TextField/TextField';
import { Label } from 'components/ui-kit/Label/Label';
import { ImageField } from 'components/ui-kit/ImageField/ImageField';
import { FieldWrapper } from 'components/ui-kit/FieldWrapper/FieldWrapper';
import { AttributesField } from 'components/ui-kit/AttributesField/AttributesField';

type FieldValues = Nullable<TokenMetadata>;

const schema = yup.object({
  image: yup
    .mixed()
    .nullable()
    .required('Image is required')
    .test({
      message: 'Invalid file type',
      test: (file: File) => file?.type.startsWith('image/'),
    }),
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
  submitButton: ReactNode
}

// TODO: add hook useTokeMetadataForm
export const TokenMetadataForm = (props: Props) => {
  const {
    localStorageKey,
    submitButton,
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
    const checkFields = (values: FieldValues): values is TokenMetadata => (
      Boolean(values.image)
    );

    if (checkFields(fieldValues)) {
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

    return () => {
      setStateToLS();
      window.removeEventListener('beforeunload', setStateToLS);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(submit)}
    >
      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <Label
            title="Image of your item"
            htmlFor="image"
          >
            <FieldWrapper error={fieldState.error?.message}>
              <ImageField
                id="image"
                error={fieldState.error}
                {...field}
              />
            </FieldWrapper>
          </Label>
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Label
            title="Name"
            htmlFor="name"
            optional
          >
            <FieldWrapper error={fieldState.error?.message}>
              <Field
                id="name"
                placeholder="Item name"
                error={fieldState.error}
                {...field}
                value={field.value || ''}
              />
            </FieldWrapper>
          </Label>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Label
            title="Description"
            htmlFor="description"
            optional
          >
            <FieldWrapper error={fieldState.error?.message}>
              <TextField
                id="description"
                placeholder="Item description"
                error={fieldState.error}
                {...field}
                value={field.value || ''}
              />
            </FieldWrapper>
          </Label>
        )}
      />

      <Controller
        name="attributes"
        control={control}
        render={({ field }) => (
          <Label title="Item Attributes">
            <FieldWrapper>
              <AttributesField
                {...field}
                attributes={field.value}
                onChange={field.onChange}
              />
            </FieldWrapper>
          </Label>
        )}
      />

      <div className={style.buttonPlace}>
        {submitButton || (
          <Button
            className={style.submitBtn}
            type="submit"
          >
            Save
          </Button>
        )}
      </div>
    </form>
  );
};
