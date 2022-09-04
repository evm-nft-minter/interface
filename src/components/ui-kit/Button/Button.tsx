import {
  ButtonHTMLAttributes,
  FC,
  memo,
  PropsWithChildren,
} from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/Button/Button.module.scss';

enum ButtonModeEnum {
  Primary = 'primary',
  Secondary = 'secondary',
}

const MODE_TO_CLASS: Record<ButtonModeEnum, string> = {
  [ButtonModeEnum.Primary]: style.primary,
  [ButtonModeEnum.Secondary]: style.secondary,
};

interface Props extends PropsWithChildren,
  ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonModeEnum
}

type ButtonType = FC<Props> & {
  mode: typeof ButtonModeEnum
};

export const Button = memo((props: Props) => {
  const {
    className,
    mode = ButtonModeEnum.Primary,
    ...rest
  } = props;

  const rootClassName = cn(
    className,
    style.button,
    MODE_TO_CLASS[mode],
  );

  return (
    <button
      className={rootClassName}
      {...rest}
    >
      {props.children}
    </button>
  );
}) as unknown as ButtonType;

Button.mode = ButtonModeEnum;
