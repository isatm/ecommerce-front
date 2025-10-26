import { ReactNode } from "react";

export interface ToggleButtonProps {
  options: string[]; // número y nombre de las opciones
  buttonStyle?: string; // estilos de tailwind para el botón
  menuStyle?: string; // estilos del menú desplegable
  animation?: "fade" | "slide" | "scale" | "none"; // tipo de animación
  onSelect?: (value: string) => void; // callback al seleccionar opción
  content?: string; //contenido que quieres que tenga el boton (opcional)
  icon?: ReactNode; // El ícono es opcional
}