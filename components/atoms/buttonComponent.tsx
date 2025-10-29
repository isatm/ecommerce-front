import React from 'react';

import { ButtonProps } from "@/interfaces/buttonInterfaces/buttonPropsInterface"; 
import { useButton } from "@/hooks/useButton";    

export default function Button(props: ButtonProps) {
  const { children, icon, fullWidth, variant, className, ...restProps } = props;
  const { style } = useButton({ children, icon, fullWidth, variant, className, ...restProps });

  return (
    <button className={style} {...restProps}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}