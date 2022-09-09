import { PropsWithChildren } from 'react';
import style from 'components/ui-kit/Label/Label.module.scss';

interface Props extends PropsWithChildren {
  title: string
  htmlFor?: string
  optional?: boolean
}

export const Label = (props: Props) => {
  const {
    title,
    htmlFor,
    optional,
  } = props;

  return (
    <div className={style.wrapper}>
      <label htmlFor={htmlFor} className={style.label}>
        <p className={style.title}>
          {title}

          {optional && (
            <span className={style.optional}>
              {' (optional)'}
            </span>
          )}
        </p>
      </label>

      {props.children}
    </div>
  );
};
