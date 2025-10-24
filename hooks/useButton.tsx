import { ButtonProps, ButtonVariant } from "@/interfaces/buttonProps";
import {
  buttonBaseStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonDarkStyles,
  buttonGoogleStyles,
  buttonDisabledStyles
} from "@/utils/Tokens"
import clsx from 'clsx';

export const useButton = (props: ButtonProps) => {
  const { variant = 'primary', fullWidth = false, disabled, className } = props;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: buttonPrimaryStyles,
    secondary: buttonSecondaryStyles,
    dark: buttonDarkStyles,
    google: buttonGoogleStyles,
  };

  const style = clsx(
    buttonBaseStyles,
    variantStyles[variant],
    fullWidth && 'w-full',
    disabled && buttonDisabledStyles,
    className 
  );

  return { style };
};