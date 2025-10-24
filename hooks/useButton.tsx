import { ButtonProps, ButtonVariant } from "@/interfaces/buttonProps";
import {
  buttonBaseStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonDarkStyles,
  buttonGoogleStyles, 
  buttonDisabledStyles,
  buttonAppleStyles, 
  buttonFacebookStyles 
} from "@/utils/Tokens"
import clsx from 'clsx';

export const useButton = (props: ButtonProps) => {
  const { variant = 'primary', fullWidth = false, disabled, className } = props;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: buttonPrimaryStyles,
    secondary: buttonSecondaryStyles,
    dark: buttonDarkStyles, // Este es el botón "Iniciar sesión"
    google: buttonGoogleStyles, // Botón gris con borde
    apple: buttonGoogleStyles, // Botón gris con borde (usamos el mismo estilo que Google)
    facebook: buttonGoogleStyles // Botón gris con borde (usamos el mismo estilo que Google)
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