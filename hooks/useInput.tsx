'use client';
import { useState, useMemo, ReactNode } from "react";
import { Eye, EyeOff, Search } from "lucide-react";

export default function useInput(typeElement: string, iconLeft?: ReactNode, iconRight?: ReactNode) {
  const [showPassword, setShowPassword] = useState(false);

  // Determina el tipo actual 
  const actualType = useMemo(() => {
    if (typeElement === "password" && showPassword) return "text";
    return typeElement;
  }, [typeElement, showPassword]);

  // Ícono para alternar visibilidad de contraseña
  const passwordToggleButton = useMemo(() => {
    if (typeElement !== "password") return null;

    return (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    );
  }, [typeElement, showPassword]);

  // Ícono izquierdo 
  const leftIcon = useMemo(() => {
    if (iconLeft) return iconLeft;
    return null;
  }, [iconLeft]);

  // Nuevo estado para determinar si es un input de búsqueda con un icono a la derecha
  const isSearchWithRightIcon = useMemo(() => {
    return typeElement === "search" && iconRight;
  }, [typeElement, iconRight]);

  // Cálculo dinámico de paddings
  const paddingLeft = leftIcon ? "pl-10" : "pl-4";
  const paddingRight = passwordToggleButton || isSearchWithRightIcon ? "pr-10" : "pr-4"; 

  return {
    showPassword,
    setShowPassword,
    actualType,
    passwordToggleButton,
    leftIcon,
    paddingLeft,
    paddingRight,
    isSearchWithRightIcon, 
  };
}