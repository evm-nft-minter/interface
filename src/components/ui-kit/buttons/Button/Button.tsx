import {
  ButtonHTMLAttributes,
  FC,
  memo,
  PropsWithChildren,
} from 'react';
import cn from 'classnames';
import style from 'components/ui-kit/buttons/Button/Button.module.scss';

enum ButtonModeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BORDER = 'border',
  // TODO: think about necessity of these types
  // ICON = 'icon',
  // TRANSPARENT = 'transparent',
  // BORDERLESS = 'borderless',
}

const MODE_TO_CLASS: Record<ButtonModeEnum, string> = {
  [ButtonModeEnum.PRIMARY]: style.primary,
  [ButtonModeEnum.SECONDARY]: style.secondary,
  [ButtonModeEnum.BORDER]: style.border,
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
    mode = ButtonModeEnum.PRIMARY,
    ...rest
  } = props;

  return (
    <button
      className={cn(MODE_TO_CLASS[mode], className)}
      type="button"
      {...rest}
    >
      {props.children}
    </button>
  );
}) as unknown as ButtonType;

Button.mode = ButtonModeEnum;
